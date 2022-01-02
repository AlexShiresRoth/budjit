import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.model';
import { Occasion } from './occasion.model';

@Schema()
export class History {
  @Prop({ default: Date.now })
  date: Date;
  @Prop({ required: true })
  paymentAmount: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  contributor: Account;
  @Prop()
  paymentMethod: string;
  @Prop()
  currentBudgetAmount: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' })
  occasionRef: Occasion;
}

export type HistoryDocument = History & Document;

export const HistorySchema = SchemaFactory.createForClass(History);
