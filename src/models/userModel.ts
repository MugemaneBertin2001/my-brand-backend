import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    role: String,
    email: String;
    password: string;
}

const userSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    role: {type:String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
