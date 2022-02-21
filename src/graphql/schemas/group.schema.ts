import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { AccountTypeDef } from './account.schema';

@ObjectType()
export class GroupTypeDef {
  @Field(() => [String])
  members: AccountTypeDef[];
  @Field(() => [String])
  invites: Invite[];
  @Field(() => String)
  occasionRef: string;
  @Field()
  name: string;
  @Field(() => String)
  creator: Account;
}
