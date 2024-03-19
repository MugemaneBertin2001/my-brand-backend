import UserModel, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateJWT } from '../utils/jwtHelper';
import { hashPassword } from './passwordHashHelper';

export const registerUser = async (fullName: string, role: string, email: string, password: string): Promise<IUser> => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({
        fullName,
        role,
        email,
        password: hashedPassword,
    });
    return await newUser.save();
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return generateJWT(user._id, user.email, user.role)
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find();
};

export const updateUserById = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
};

export const deleteUserById = async (userId: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(userId);
};
