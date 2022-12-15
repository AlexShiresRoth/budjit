import { Field, Float, InputType, Int } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { Transaction } from 'src/mongo-schemas/transaction.model';
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
export class LoadOccasionInput {
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
  @Field({ nullable: true })
  occasionEndDate: string;
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

@InputType()
export class RemoveOccasionInput {
  @Field()
  occasionID: string;
}

@InputType()
export class AddTransactionToOccasionInput {
  @Field(() => String)
  transactionRef: Transaction;
  @Field(() => String)
  occasionRef: Occasion;
  @Field(() => Float)
  transactionAmount: number;
}
