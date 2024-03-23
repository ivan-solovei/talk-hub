import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});