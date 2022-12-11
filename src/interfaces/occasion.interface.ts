export interface OccasionInterface {
  title: string;
  budget: string;
  creator: string;
  externalInvites: Array<{ _id: any }> | any[];
  invites: Array<{ _id: any }> | any[];
  members: { _id: string }[];
  initialBudget: string;
  occasionCreationDate?: number | string;
  occasionStartDate: string | number;
  occasionEndDate: string | number;
}
