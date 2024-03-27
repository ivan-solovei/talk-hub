import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly messages: [];
  readonly members: [];
  readonly createdAt: string;
}