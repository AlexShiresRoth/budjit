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
  sentInvites: Invite[];
}

@ObjectType()
export class LoadSentInvitesResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [InvitesTypeDef])
  sentInvites: Invite[];
}

@ObjectType()
export class LoadReceivedInvitesResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [InvitesTypeDef])
  receivedInvites: Invite[];
}
