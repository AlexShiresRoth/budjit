import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AccountTypeDef } from './account.schema';
import { OccasionTypeDef } from './occasion.schema';

@ObjectType()
export class TransactionTypeDef {
  @Field()
  name: string;
  @Field()
  category: string;
  @Field()
  amount: number;
  @Field()
  date: string;
  @Field({ nullable: true })
  accountType: string;
  @Field()
  location: string;
  @Field()
  _id: string;
  @Field()
  account_id: string;
  @Field(() => OccasionTypeDef, { nullable: true })
  occasionRef: Occasion;
  @Field(() => AccountTypeDef, { nullable: true })
  personAccountRef: Account;
}
