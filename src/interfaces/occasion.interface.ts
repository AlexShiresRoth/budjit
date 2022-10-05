import mongoose from 'mongoose';
import { ExternalInviteTypeDef } from 'src/graphql/schemas/externalInvite.schema';
import { ExternalInvite } from 'src/mongo-schemas/ExternalInvite';

export interface OccasionInterface {
  title: string;
  budget: string;
  creator: string;
  externalInvites: Array<{ _id: any }> | any[];
  invites: Array<{ _id: any }> | any[];
  members: string[];
  initialBudget: string;
  occasionStartDate: string;
}
