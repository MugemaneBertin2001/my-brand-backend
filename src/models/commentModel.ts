import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  name: string;
  body: string;
}

const CommentSchema: Schema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  name: { type: String, required: true },
  body: { type: String, required: true },
});

const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
