import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});