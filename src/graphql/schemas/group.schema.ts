import { Field, ObjectType, ID } from '@nestjs/graphql';
import { AccountTypeDef } from './account.schema';
import { InvitesTypeDef } from './invite.schema';

@ObjectType()
export class GroupTypeDef {
  @Field(() => [AccountTypeDef])
  members: AccountTypeDef[];
  @Field(() => [InvitesTypeDef])
  invites: InvitesTypeDef[];
  @Field(() => String)
  occasionRef: string;
}
