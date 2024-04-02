import { Request, Response } from 'express';
import * as blogService from '../services/blogService';
import { uploadToCloud } from '../utils/cloudinaryHelper';

export const createBlog = async (req: Request, res: Response) => {
    try {
        let blogImage;
        if (req.file) {
            blogImage = await uploadToCloud(req.file);
        } else {
            blogImage = null;
        }
        const { title, content} = req.body;
        const newBlog = await blogService.createBlog(title, content, blogImage);
        res.status(201).json(newBlog);
    } catch (error) {

        res.status(500).json({ error: error });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error});
    }
};

export const getOneBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.getOneBlog(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        let blogImage;
        
        // Check if a new image file is uploaded
        if (req.file) {
            blogImage = await uploadToCloud(req.file);
        }
        
        // Extract other update data from the request body
        const updateData = req.body;
        
        // Update the blog post with the new image and other data
        const updatedBlog = await blogService.updateBlog(blogId, updateData, blogImage);
        
        // Check if the blog post was found and updated successfully
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        
        // Respond with the updated blog post
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const isDeletedBog = await blogService.deleteBlog(blogId);
        if(isDeletedBog === null){
            res.status(404).json({ Msg: "Blog not found!" });

        }else{
            res.status(200).json({ 
                message: "Deleted successfully" ,
                deletedBlog: isDeletedBog
            });
        }

    } catch (error:any) {

        res.status(500).json({ error: error.message });
    }
};


