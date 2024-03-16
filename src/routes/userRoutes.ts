import express, { Router, Request, Response } from 'express';
import { deleteUserById, getAllUsers, loginUser, registerUser, updateUserById } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/register', registerUser);
userRouter.get("/login", loginUser)
userRouter.get('/list', getAllUsers);
userRouter.put('/:id',updateUserById).delete("/:id",deleteUserById);
export default userRouter;
