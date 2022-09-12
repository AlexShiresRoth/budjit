import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './account.model';
import * as mongoose from 'mongoose';
import { Invite } from './Invite.model';
import { Occasion } from './occasion.model';
import { ExternalInvite } from './ExternalInvite';

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
          ref: 'Invite',
        },
      },
    ]),
  )
  invites: Invite[];
  @Prop(
    raw([
      {
        invite_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ExternalInvite',
        },
      },
    ]),
  )
  externalInvites: ExternalInvite[];
  @Prop(
    raw([
      {
        occasion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' },
      },
    ]),
  )
  occasions: Occasion[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  creator: Account;
  @Prop()
  name: string;
  @Prop()
  creationDate: string;
  @Prop()
  backgroundImage: string;
}

export type GroupDocument = Group & Document;

export const GroupSchema = SchemaFactory.createForClass(Group);
