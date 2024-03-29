import { Document } from 'mongoose';

export interface User extends Document {
  readonly userName: string;
  readonly userId: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly chatIds: string[];
}
