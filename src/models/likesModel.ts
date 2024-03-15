import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const LikeSchema: Schema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const LikeModel = mongoose.model<ILike>('Like', LikeSchema);

export default LikeModel;
