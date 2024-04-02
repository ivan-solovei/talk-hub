import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  senderName: { type: String, required: false },
  receiver: { type: String, required: true },
  receiverName: { type: String, required: false },
  timestamp: { type: String, default: Date.now },
  chatId: { type: String, required: true },
});