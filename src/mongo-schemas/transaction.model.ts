import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transaction {
  @Prop()
  title: string;
  @Prop()
  category: string;
  @Prop()
  total: number;
  @Prop()
  date: string;
  @Prop()
  accountType: string;
}

export type TransactionDocumentType = Document & Transaction;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
