import express from 'express';
import * as blogController from '../controllers/blogController';
import { customFileFilter, fileUpload } from '../utils/multerHelper';
import * as commentController from '../controllers/commentController';
import { authenticateUser, authorize } from '../middleware/authMiddleware';
import * as likeController from '../controllers/likeController';

const router = express.Router();

router.post('/',authenticateUser, authorize('admin'),fileUpload.single('file'), customFileFilter, blogController.createBlog);
router.get('/',blogController.getAllBlogs);
router.get('/:id', blogController.getOneBlog);
router.put('/:id', authenticateUser, authorize('admin'),blogController.updateBlog);
router.delete('/:id', authenticateUser, authorize('admin'),blogController.deleteBlog);

// likes
router.get('/:blogId/likes',  likeController.getLikesByBlogId )
router.post('/:blogId/like',authenticateUser, likeController.likeBlog )
router.post('/:blogId/unlike',authenticateUser, likeController.unlikeBlog )
// comments
router.get('/:blogId/comment',  commentController.getCommentByBlogId )
router.post('/:blogId/comment',  commentController.addComment )

export default router;
