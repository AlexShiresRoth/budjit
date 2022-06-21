import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AccountTypeDef } from './account.schema';
import { InvitesTypeDef } from './invite.schema';
import { OccasionTypeDef } from './occasion.schema';

@ObjectType()
export class GroupTypeDef {
  @Field(() => [AccountTypeDef])
  members: Account;
  @Field(() => [InvitesTypeDef], { nullable: true })
  invites: Invite[];
  @Field(() => [OccasionTypeDef], { nullable: true })
  occasions: Occasion;
  @Field()
  name: string;
  @Field(() => AccountTypeDef)
  creator: Account;
  @Field(() => String)
  creationDate: string;
  @Field(() => String)
  _id: string;
}
