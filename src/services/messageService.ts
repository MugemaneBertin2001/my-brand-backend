import MessageModel, { IMessage } from '../models/messageModel';

export const createMessage = async (fullName: string, email: string, messageBody: string): Promise<IMessage> => {
    return await MessageModel.create({ fullName, email, messageBody });
};

export const getAllMessages = async (): Promise<IMessage[]> => {
    return await MessageModel.find();
};

export const deleteMessageById = async (messageId: string): Promise<IMessage | null> => {
    return await MessageModel.findByIdAndDelete(messageId);
};