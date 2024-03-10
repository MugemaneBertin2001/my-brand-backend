import { Request, Response } from 'express';
import BlogModel from '../models/blogModel';
import { fileUpload } from '../utils/multerHelper'; // Assuming fileUpload is the helper for handling file uploads

// Create a new blog post
export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const blogImage = req.file.path; // Assuming fileUpload middleware is used to handle image upload
        const newBlog = await BlogModel.create({ title, content, blogImage });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single blog post by ID
export const getOneBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a blog post by ID
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a blog post by ID
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Like a blog post
export const likeBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = req.body.userId; // Assuming userId is passed in the request body
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { $addToSet: { likes: userId } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a comment to a blog post
export const addComment = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const { name, commentBody } = req.body;
        const comment = `${name}: ${commentBody}`;
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { $push: { comments: comment } }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
