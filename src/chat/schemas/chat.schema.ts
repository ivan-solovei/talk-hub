import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: Array, required: false },
  moderators: { type: Array, required: false },
  createdAt: { type: String, default: Date.now },
});