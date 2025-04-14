import { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
