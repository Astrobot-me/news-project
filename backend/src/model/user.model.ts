import { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
});

export const User = model<UserType>('User', UserSchema);