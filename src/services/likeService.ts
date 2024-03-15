import mongoose from "mongoose";
import LikeModel, {ILike} from "../models/likesModel";


export const likeBlog = async (blogId: string, userId: string): Promise<void> => {
    await LikeModel.create({ blog: blogId, user: userId });
};

export const unlikeBlog = async (blogId: string, userId: string): Promise<void> => {
    await LikeModel.findOneAndDelete({ blog: blogId, user: userId });
};

export const getLikesForBlog = async (blogId: string): Promise<string[]> => {
    const likes = await LikeModel.find({ blog: blogId }).select('user');
    return likes.map(like => like.user.toString());
};

export const getLikesByBlogId = async (blogId:any): Promise<ILike[]> => {
    try {
        const likes = await LikeModel.find({ blog: blogId });
        return likes;
    } catch (error) {
        throw new Error('Error retrieving likes by blog ID');
    }
};