import { Field, ObjectType } from '@nestjs/graphql';
import { ExternalInvite } from 'src/mongo-schemas/ExternalInvite';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { Update } from 'src/mongo-schemas/update.model';
import { ExternalInviteTypeDef } from './externalInvite.schema';
import { GroupTypeDef } from './group.schema';
import { HistoryTypeDef } from './history.schema';
import { InvitesTypeDef } from './invite.schema';
import { UpdateTypeDef } from './update.schema';

@ObjectType()
export class OccasionTypeDef {
  @Field()
  _id: string;
  @Field()
  title: string;
  @Field()
  budget: string;
  @Field()
  amountContributed: string;
  @Field(() => GroupTypeDef, { nullable: true })
  group: GroupTypeDef;
  @Field(() => [HistoryTypeDef], { nullable: true })
  history: HistoryTypeDef[];
  @Field()
  creator: string;
  @Field()
  initialBudget: string;
  @Field()
  occasionStartDate: string;
  @Field()
  occasionCreationDate: string;
  @Field()
  occasionEndDate: string;
  @Field(() => [ExternalInviteTypeDef], { nullable: true })
  externalInvites: ExternalInvite[];
  @Field(() => [InvitesTypeDef], { nullable: true })
  invites: Invite[];
  @Field(() => [UpdateTypeDef], { nullable: true })
  updates: Update[];
}
