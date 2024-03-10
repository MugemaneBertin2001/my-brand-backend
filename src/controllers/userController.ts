import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controller function for user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName,role, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            fullName,
            role,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully',
            user: savedUser 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function to login a user with email and password 
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' } 
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function to update a user by ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function to delete a user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
