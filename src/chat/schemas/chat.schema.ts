import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  messages: { type: Array, required: true },
  members: { type: Array, required: true },
  createdAt: { type: String, default: Date.now },
});