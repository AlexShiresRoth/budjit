import { Account } from 'src/mongo-schemas/account.model';
import { Invite } from 'src/mongo-schemas/Invite.model';

export interface GroupInterface {
  members: Account[] | null;
  invites: Invite[] | null;
}
