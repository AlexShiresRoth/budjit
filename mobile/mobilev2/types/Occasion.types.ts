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
