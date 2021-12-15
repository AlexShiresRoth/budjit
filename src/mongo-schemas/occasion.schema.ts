import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './profile.model';
import { History } from './history.schema';

export type OccasionDocument = Occasion & Document;

@Schema()
export class Occasion {
  @Prop({ required: true })
  title: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }])
  group: Profile[];
  @Prop()
  budget: string;
  @Prop()
  paymentHistory: History;
}

export const OccasionSchema = SchemaFactory.createForClass(Occasion);
