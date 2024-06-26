import BlogModel, { IBlog } from '../models/blogModel';
import { Types } from 'mongoose';

export const createBlog = async (title: string, content: string, blogImage: string | null): Promise<IBlog> => {
    return await BlogModel.create({ title, content, blogImage });
};

export const getAllBlogs = async (): Promise<IBlog[]> => {
    try {
        const blogs = await BlogModel.find()
            .populate('likes') 
            .populate('comments'); 

        return blogs;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

export const getOneBlog = async (blogId: string): Promise<IBlog | null> => {
    return await BlogModel.findById(blogId);
};

export const updateBlog = async (blogId: string, updateData: Partial<IBlog>, blogImage:any): Promise<IBlog | null> => {
    updateData.blogImage = blogImage;
    return await BlogModel.findByIdAndUpdate(blogId, updateData, { new: true });
};

export const deleteBlog = async (blogId: string): Promise<any> => {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    return deletedBlog ;
};