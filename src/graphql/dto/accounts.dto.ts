import { Invite } from 'src/mongo-schemas/Invite.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';

export interface AddOccasionDTO {
  occasion: Occasion;
  userID: string;
}

export interface AddInviteDTO {
  invite: Invite;
  userID: string;
}
