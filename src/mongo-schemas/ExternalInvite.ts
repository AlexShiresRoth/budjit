import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Group } from './group.model';
import { Occasion } from './occasion.model';

@Schema()
export class ExternalInvite {
  @Prop({ type: Date, default: Date.now })
  inviteDate: Date;
  @Prop()
  receiverName: string;
  @Prop()
  receiverPhone: string;
  @Prop({ default: 'pending' })
  status: 'pending' | 'accepted' | 'declined';
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false })
  groupRef: Group;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Occasion',
    required: false,
  })
  occasionRef: Occasion;
  @Prop()
  inviteType: 'group' | 'occasion';
}

export type ExternalInviteDocument = ExternalInvite & Document;

export const ExternalInviteSchema =
  SchemaFactory.createForClass(ExternalInvite);
