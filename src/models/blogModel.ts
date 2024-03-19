import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  blogImage: string;
  timestamp: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  blogImage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }], 
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;

