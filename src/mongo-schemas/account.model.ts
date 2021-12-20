import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './profile.model';
import { Occasion } from './occasion.schema';
import { Group } from './group.model';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groups: Group[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' })
  occasions: Occasion[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
