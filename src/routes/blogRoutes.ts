import express from 'express';
import * as blogController from '../controllers/blogController';
import { customFileFilter, fileUpload } from '../utils/multerHelper';
import * as commentController from '../controllers/commentController';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware';
import * as likeController from '../controllers/likeController';

const router = express.Router();

router.post('/',authorizeAdmin,fileUpload.single('file'), customFileFilter, blogController.createBlog);
router.get('/',blogController.getAllBlogs);
router.get('/:id', blogController.getOneBlog);
router.put('/:id',authorizeAdmin, blogController.updateBlog);
router.delete('/:id',authorizeAdmin, blogController.deleteBlog);

// likes
router.get('/:blogId/likes', authenticateUser, likeController.getLikesByBlogId )
router.post('/:blogId/like', authenticateUser, likeController.likeBlog )
router.post('/:blogId/unlike', authenticateUser, likeController.unlikeBlog )
// comments
router.get('/:blogId/comment', authenticateUser, commentController.getCommentByBlogId )
router.post('/:blogId/comment', authenticateUser, commentController.addComment )

export default router;
