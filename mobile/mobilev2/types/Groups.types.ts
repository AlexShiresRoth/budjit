//every reference to other objects are just id strings
export type GroupType = {
  _id: string;
  creationDate: string;
  name: string;
  creator: string;
  invites: Array<string>;
  members: Array<string>;
  occasions: Array<string>;
  backgroundImage: string;
};
