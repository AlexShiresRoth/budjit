import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
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
  @Field()
  name: string;
  @Field(() => AccountTypeDef)
  creator: Account;
}
