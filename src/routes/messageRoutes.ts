import express from 'express';
import * as messageController from '../controllers/messageController';
import { authenticateUser, authorize } from '../middleware/authMiddleware';

const messageRoute = express.Router();

messageRoute.post('/', messageController.createMessage);
messageRoute.get('/',authenticateUser, authorize('admin'), messageController.getAllMessages);
messageRoute.get('/',authenticateUser, authorize('admin'), messageController.getAllMessages);
messageRoute.delete('/:id',authenticateUser, authorize('admin'), messageController.deleteMessageById); 

export default messageRoute;
