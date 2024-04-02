import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  fullName: string;
  email: string;
  subject:string,
  messageBody: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject:{type:String, required:true},
  messageBody: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;


