import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './profile.model';
import { Occasion } from './occasion.model';
import { Group } from './group.model';
import { Invite } from './Invite.model';

@Schema()
export class Account {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
  @Prop(
    raw([
      { group_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] },
    ]),
  )
  groups: Group[];
  @Prop(
    raw([
      {
        occasion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' },
      },
    ]),
  )
  occasions: Occasion[];
  @Prop(
    raw([
      { invite_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invite' } },
    ]),
  )
  invites: Invite[];
}

export type AccountDocument = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);
