import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.model';
import { Group } from './group.model';

@Schema()
export class Invite {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ type: Date, default: Date.now })
  inviteDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  sender: Account;
  @Prop()
  receiver: string;
  @Prop({ default: 'pending' })
  status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groupRef: Group;
}

export type InviteDocument = Invite & Document;

export const InviteSchema = SchemaFactory.createForClass(Invite);
