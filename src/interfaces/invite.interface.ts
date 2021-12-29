import { Account } from 'src/mongo-schemas/account.model';

export interface InviteInterface {
  sender: Account;
  receiver: Account;
  inviteDate: Date;
  status: string;
}
