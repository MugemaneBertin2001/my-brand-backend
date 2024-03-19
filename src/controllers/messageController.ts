import { Request, Response } from 'express';
import * as messageService from '../services/messageService';

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, messageBody } = req.body;
        const newMessage = await messageService.createMessage(fullName, email, messageBody);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error:error });
    }
};

export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await messageService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: error});
    }
};

export const deleteMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await messageService.deleteMessageById(messageId);
        if (!deletedMessage) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.status(200).json({ message: 'Message deleted successfully', deletedMessage });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: error });
    }
};
