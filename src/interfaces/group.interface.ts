import { Account } from 'src/mongo-schemas/account.model';
import { Invite } from 'src/mongo-schemas/Invite.model';

export interface GroupInterface {
  members: Account[] | null;
  invites: Invite[] | null;
  groupName: string;
  creator: Account;
}

export interface AddOccasionRef {
  occasionRefId: any;
  groupID: string;
}
