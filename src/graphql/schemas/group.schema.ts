import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { ExternalInvite } from 'src/mongo-schemas/ExternalInvite';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AccountTypeDef } from './account.schema';
import { ExternalInviteTypeDef } from './externalInvite.schema';
import { InvitesTypeDef } from './invite.schema';
import { OccasionTypeDef } from './occasion.schema';

@ObjectType()
export class GroupTypeDef {
  @Field(() => [AccountTypeDef])
  members: Account[];
  @Field(() => [InvitesTypeDef], { nullable: true })
  invites: Invite[];
  @Field(() => [ExternalInviteTypeDef], { nullable: true })
  externalInvites: ExternalInvite[];
  @Field(() => [OccasionTypeDef], { nullable: true })
  occasions: Occasion[];
  @Field()
  name: string;
  @Field(() => AccountTypeDef)
  creator: Account;
  @Field()
  creationDate: string;
  @Field()
  _id: string;
  @Field()
  backgroundImage: string;
}
