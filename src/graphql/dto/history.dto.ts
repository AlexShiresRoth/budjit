import { Account } from 'src/mongo-schemas/account.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';

export interface CreateAHistoryObjDTO {
  paymentAmount: string;
  contributor: Account;
  date: Date;
  paymentMethod: string;
  currentBudgetAmount: string;
  occasionRef: Occasion;
}
