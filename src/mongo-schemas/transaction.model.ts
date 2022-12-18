import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Account } from './account.model';
import { Occasion } from './occasion.model';

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ default: 'manual_transaction' })
  account_id: string;
  @Prop()
  name: string;
  @Prop()
  category: string;
  @Prop()
  amount: number;
  @Prop()
  date: string;
  @Prop()
  accountType: string;
  @Prop()
  location: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  personAccountRef: Account;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Occasion',
    required: false,
  })
  occasionRef: Occasion;
}

export type TransactionDocumentType = Document & Transaction;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
