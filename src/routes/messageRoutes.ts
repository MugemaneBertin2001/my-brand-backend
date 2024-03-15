import express from 'express';
import * as messageController from '../controllers/messageController';
import { authorizeAdmin } from '../middleware/authMiddleware';

const messageRoute = express.Router();

messageRoute.post('/', messageController.createMessage);
messageRoute.get('/',authorizeAdmin, messageController.getAllMessages);
messageRoute.delete('/:id',authorizeAdmin, messageController.deleteMessageById); 

export default messageRoute;
