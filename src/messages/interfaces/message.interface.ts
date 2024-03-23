import { Document } from 'mongoose';

export interface Message extends Document {
  readonly text: string;
  readonly sender: string;
  readonly timestamp: string;
}