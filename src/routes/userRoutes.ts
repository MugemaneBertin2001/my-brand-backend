import express, { Router, Request, Response } from 'express';
import { deleteUserById, getAllUsers, loginUser, registerUser, updateUserById } from '../controllers/userController';
import { authenticateUser, authorize } from '../middleware/authMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/register', registerUser);
userRouter.post("/login", loginUser)
userRouter.get('/list',authenticateUser, authorize('admin'),getAllUsers);
userRouter.put('/:id',authenticateUser, authorize('admin'),updateUserById)
userRouter.delete("/:id",authenticateUser, authorize('admin'),deleteUserById);
export default userRouter;