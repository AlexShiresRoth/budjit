import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Transaction {
  // @Prop({ type: String })
  // _id: string;
  @Prop({ default: 'manual_transaction' })
  account_id: string;
  @Prop()
  title: string;
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
}

export type TransactionDocumentType = Document & Transaction;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
