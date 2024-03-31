import { Request, Response } from 'express';
import * as commentService from '../services/commentService'

export const addComment = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.blogId;
        const {name, body } = req.body;
        await commentService.addComment(blogId,name,body);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};


export const getCommentByBlogId = async (req: Request, res: Response) =>{
    try{
        const blogId = req.params.blogId;
        const comments = await commentService.getCommentsForBlog(blogId);
        res.status(201).json({ 
            message: 'comments for this blog',
            blogId,
            comments
        });


    }catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}
