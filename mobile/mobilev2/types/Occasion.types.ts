export type OccasionType = {
  _id: string;
  title: string;
  creator: string;
  amountContributed: string;
  initialBudget: string;
  budget: string;
  category: string;
  occasionStartDate: string;
  occasionEndDate: string;
  occasionCreationDate: string;
  externalInvites: Array<{ _id: string }>;
  updates: Array<any>;
  invites: Array<{ _id: string }>;
};

export type OccasionTransactionsType = {
  message: string;
  success: boolean;
  transactions: Array<{
    _id: string;
    name: string;
    amount: number;
    date: string;
    occasionRef: {
      _id: string;
    };
    personAccountRef: {
      _id: string;
    };
  }>;
};
