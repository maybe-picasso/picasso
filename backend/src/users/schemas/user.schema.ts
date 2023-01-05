import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  profileUrl: string;

  @Prop()
  locale: string;

  @Prop()
  registerType: string;

  @Prop()
  avatar: number[];

  @Prop()
  point: number;

  @Prop()
  lastLoginDate: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
