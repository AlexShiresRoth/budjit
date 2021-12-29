import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.model';

@Schema()
export class Invite {
  @Prop({ type: Date, default: Date.now })
  inviteDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  sender: Account;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  receiver: Account;
  @Prop({ default: 'pending' })
  status: string;
}

export type InviteDocument = Invite & Document;

export const InviteSchema = SchemaFactory.createForClass(Invite);
