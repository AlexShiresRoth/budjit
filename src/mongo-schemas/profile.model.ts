import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Profile {
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  avatar: string;
}

export type ProfileDocument = Profile & Document;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
