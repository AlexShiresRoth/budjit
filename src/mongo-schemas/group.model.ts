import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.model';
import * as mongoose from 'mongoose';
import { Invite } from './Invite.model';

//this allows for ids to be passed as an object but not accessible via gql?
@Schema()
export class Group {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: string;
  @Prop(
    raw([
      {
        member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
      },
    ]),
  )
  members: Array<Account>;
  @Prop(
    raw([
      {
        invite_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Account',
        },
      },
    ]),
  )
  invites: Invite[];
}

export type GroupDocument = Group & Document;

export const GroupSchema = SchemaFactory.createForClass(Group);
