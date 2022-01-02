import { Field, InputType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
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
