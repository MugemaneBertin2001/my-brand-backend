import express, { Router, Request, Response } from 'express';
import { addComment, createBlog, deleteBlog, getAllBlogs, getOneBlog, likeBlog, updateBlog } from '../controllers/blogController';
import { customFileFilter, fileUpload } from '../utils/multerHelper';
import { authenticateUser } from '../middleware/authMiddleware';


const blogRouter: Router = express.Router();

blogRouter.post('/create',fileUpload.single('file'), customFileFilter,createBlog);
blogRouter.get('/retrieve', getAllBlogs).get("/:id", getOneBlog)
blogRouter.put('/:id', updateBlog)
blogRouter.post('/:id/like', likeBlog)
blogRouter.post('/:id/comment', addComment)
blogRouter.delete('/:id', deleteBlog)

export default blogRouter

