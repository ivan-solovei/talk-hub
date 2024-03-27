import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  timestamp: { type: String, default: Date.now },
  chatId: { type: String, required: true },
});