import { Field, ObjectType } from '@nestjs/graphql';
import { AccountTypeDef } from './account.schema';

@ObjectType()
export class HistoryTypeDef {
  @Field()
  date: Date;
  @Field()
  paymentAmount: string;
  @Field()
  contributor: AccountTypeDef;
  @Field()
  paymentMethod: string;
}
