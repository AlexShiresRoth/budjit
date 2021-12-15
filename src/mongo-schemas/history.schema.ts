import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './profile.model';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  @Prop({ default: Date.now })
  date: Date;
  @Prop({ required: true })
  paymentAmount: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  contributor: Profile;
  @Prop()
  paymentMethod: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
