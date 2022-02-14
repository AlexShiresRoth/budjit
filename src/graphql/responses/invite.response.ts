import { Field, ObjectType } from '@nestjs/graphql';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { InvitesTypeDef } from '../schemas/invite.schema';

@ObjectType()
export class CreateInviteResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => Invite)
  invite: Invite;
}
@ObjectType()
export class CreateInvitesResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [InvitesTypeDef])
  invites: Invite[];
}
