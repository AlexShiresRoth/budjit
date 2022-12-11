import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { History } from './history.model';
import { Group } from './group.model';
import { Account } from './account.model';
import { ExternalInviteModule } from 'src/modules/externalInvite.module';
import { ExternalInvite } from './ExternalInvite';
import { Update } from './update.model';
import { Invite } from './Invite.model';

@Schema()
export class Occasion {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ required: true })
  title: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false })
  group: Group;
  @Prop(
    raw([
      {
        account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
      },
    ]),
  )
  members: Account[];
  @Prop()
  budget: string;
  @Prop({ default: '0.00' }) 
  amountContributed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  creator: Account;
  @Prop()
  initialBudget: string;
  @Prop()
  category: string;
  @Prop()
  creationDate: string;
  @Prop({ default: Date.now })
  occasionStartDate: number;
  @Prop({ default: Date.now })
  occasionEndDate: number;
  @Prop({ default: Date.now })
  occasionCreationDate: number;
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
      { updateRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Update' } },
    ]),
  )
  updates: Update[];
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
}

export type OccasionDocument = Occasion & Document;

export const OccasionSchema = SchemaFactory.createForClass(Occasion);
