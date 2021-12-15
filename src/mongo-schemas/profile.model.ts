import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  name: string;
  @Prop()
  phone: string;
  @Prop()
  avatar: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
