import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export const defaultAvatar =
  'https://res.cloudinary.com/snackmanproductions/image/upload/v1642559391/budjit-app/jeffgoldie.jpg';

@Schema()
export class Profile {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;
  @Prop()
  name: string;
  @Prop({ default: defaultAvatar })
  avatar: string;
}

export type ProfileDocument = Profile & Document;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
