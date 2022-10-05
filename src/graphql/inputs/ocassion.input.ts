import { Field, InputType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { ExternalInvite } from 'src/mongo-schemas/ExternalInvite';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { ExternalInviteTypeDef } from '../schemas/externalInvite.schema';
import { InvitesTypeDef } from '../schemas/invite.schema';
import { Contact, Member } from './group.input';
import { Invite } from './invite.input';

@InputType()
export class AddMembersInput {
  @Field(() => [Invite])
  invites: Invite[];
  @Field()
  occasionID: string;
}

@InputType()
export class CreateOccasionInput {
  @Field()
  title: string;
  @Field()
  budget: string;
  @Field({ nullable: true })
  occasionStartDate: string;
  @Field(() => [Contact], { nullable: true })
  contacts: Contact[];
  @Field(() => [Member], { nullable: true })
  members: Member[];
}

@InputType()
export class ContributeToBudgetInput {
  @Field()
  paymentAmount: string;
  @Field({ nullable: true })
  paymentMethod: string;
  @Field(() => Date, { nullable: true })
  date: Date;
  @Field(() => String)
  occasionID: Occasion;
}
