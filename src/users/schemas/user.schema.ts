import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongoose } from '@typegoose/typegoose';
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

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id;
}

export const UserSchema = SchemaFactory.createForClass(User);