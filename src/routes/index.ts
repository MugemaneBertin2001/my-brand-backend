import express from 'express';
import blogRoutes from './blogRoutes';
import userRouter from './userRoutes';
import messageRoute from './messageRoutes';

const router = express.Router();

router.use('/users', userRouter);
router.use('/blogs', blogRoutes);
router.use('/message', messageRoute)

export default router;
