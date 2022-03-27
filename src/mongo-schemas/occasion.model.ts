import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { History } from './history.model';
import { Group } from './group.model';
import { Account } from './account.model';

@Schema()
export class Occasion {
  @Prop({ required: true })
  title: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false })
  group: Group;
  @Prop()
  budget: string;
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false },
    ],
  })
  history: History[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  creator: Account;
  @Prop()
  initialBudget: string;
  @Prop()
  category: string;
  @Prop()
  creationDate: string;
  @Prop()
  occasionStartDate: string;
}

export type OccasionDocument = Occasion & Document;

export const OccasionSchema = SchemaFactory.createForClass(Occasion);
