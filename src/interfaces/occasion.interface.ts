export interface OccasionInterface {
  title: string;
  budget: string;
  group: {
    members: Array<{ _id: string }>;
    invites: Array<{
      sender: string;
      receiver: string;
    }>;
  };
  creator: string;
}
