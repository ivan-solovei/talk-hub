import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly icon: string;
  readonly name: string;
  readonly title: string;
  readonly createdAt: string;
  type: [] // moderatedChat/freeChat
  moderators: []//Ai ids
}