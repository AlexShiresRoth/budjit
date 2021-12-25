import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.model';

@Schema({ _id: false })
export class Invite {
  @Prop({ type: Date, default: Date.now })
  inviteDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  sender: Account;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  receiver: Account;
}

export type InviteDocument = Invite & Document;

export const InviteSchema = SchemaFactory.createForClass(Invite);
