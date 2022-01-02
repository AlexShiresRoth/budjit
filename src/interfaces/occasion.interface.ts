import { Group } from 'src/mongo-schemas/group.model';
import { InviteInterface } from './invite.interface';

export interface OccasionInterface {
  title: string;
  budget: string;
  creator: string;
  group: Group;
  invites: InviteInterface[] | Array<null>;
  initialBudget: string;
}
