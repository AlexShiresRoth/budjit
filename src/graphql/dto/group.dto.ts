import { Group } from 'src/mongo-schemas/group.model';

export interface AddMembersDTO {
  groupID: Group;
  userID: string;
}
