import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, role, email, password } = req.body;
        const newUser = await userService.registerUser(fullName, role, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: error });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error:error });
    }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUserById(userId, userData);
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error});
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUserById(userId);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
