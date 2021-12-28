import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './profile.model';
import { Occasion } from './occasion.model';
import { Group } from './group.model';

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
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] })
  groups: Group[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' }] })
  occasions: Occasion[];
}

export type AccountDocument = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);
