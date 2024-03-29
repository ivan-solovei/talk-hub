import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;
  
  @Prop()
  password: string;
  
  @Prop()
  chatIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);