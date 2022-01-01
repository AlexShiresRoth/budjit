import { Account } from 'src/mongo-schemas/account.model';
import * as mongoose from 'mongoose';

export interface InviteInterface {
  sender: Account;
  receiver: Account;
  inviteDate: Date;
  status: string;
  _id: any;
  groupRef: any;
}
