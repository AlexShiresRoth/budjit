import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.model';

@Schema()
export class History {
  @Prop({ default: Date.now })
  date: Date;
  @Prop({ required: true })
  paymentAmount: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }] })
  contributor: Account[];
  @Prop()
  paymentMethod: string;
}

export type HistoryDocument = History & Document;

export const HistorySchema = SchemaFactory.createForClass(History);
