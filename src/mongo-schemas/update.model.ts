import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Account } from './account.model';
import { Group } from './group.model';

@Schema()
export class Update {
  @Prop({ default: Date.now })
  updateTime: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  userRef: Account;
  @Prop({ required: true })
  updateDetails: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groupRef: Group;
}

export type UpdateDocumentType = Document & Update;

export const UpdateSchema = SchemaFactory.createForClass(Update);
