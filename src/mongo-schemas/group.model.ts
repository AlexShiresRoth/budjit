import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.model';
import * as mongoose from 'mongoose';

@Schema()
export class Group {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  members: Account[];
  @Prop()
  invites: string[];
}

export type GroupDocument = Group | Document;

export const GroupSchema = SchemaFactory.createForClass(Group);
