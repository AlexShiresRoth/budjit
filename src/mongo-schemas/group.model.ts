import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.model';
import * as mongoose from 'mongoose';
import { Invite } from './Invite.model';

@Schema()
export class Group {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Account' })
  members: Account[];
  @Prop([Invite])
  invites: Invite[];
}

export type GroupDocument = Group | Document;

export const GroupSchema = SchemaFactory.createForClass(Group);
