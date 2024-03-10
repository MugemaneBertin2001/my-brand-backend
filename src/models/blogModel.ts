import mongoose, { Schema, Document } from 'mongoose';

interface IBlog extends Document {
  title: string;
  content: string;
  blogImage: string;
  timestamp: Date;
  comments: string[];
  likes: string[];
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  blogImage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  comments: [{ type: String }],
  likes: [{ type: String }],
});

const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);

export default BlogModel;
