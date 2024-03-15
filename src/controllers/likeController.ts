import { Request, Response } from 'express';
import LikeModel from '../models/likesModel';
import jwt from 'jsonwebtoken';
import * as likeService from '../services/likeService'
export const likeBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.blogId;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'my_jwt_secret');
        const userId = decodedToken.userId;
        const existingLike = await LikeModel.findOne({ blog: blogId, user: userId });
        if (existingLike) {
            await LikeModel.findByIdAndDelete(existingLike._id);
            return res.status(200).json({ message: 'Like removed successfully' });
        }
        await LikeModel.create({ blog: blogId, user: userId });
        res.status(201).json({ message: 'Blog liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

export const unlikeBlog = async (req: Request, res: Response) => {
    try {
        const blogId  = req.params.blogId;
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'my_jwt_secret');
        const userId = decodedToken.userId;
        await LikeModel.findOneAndDelete({ blog: blogId, user: userId });
        res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

export const getLikesByBlogId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { blogId } = req.params;
        const likes = await likeService.getLikesByBlogId(blogId);
        res.status(200).json(likes);
    } catch (error) {
        console.error('Error getting likes by blog ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};