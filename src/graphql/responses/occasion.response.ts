import { Field, ObjectType } from '@nestjs/graphql';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { OccasionTypeDef } from '../schemas/occasion.schema';
import { TransactionTypeDef } from '../schemas/transactions.schema';

@ObjectType()
export class CreateOccasionResponse {
  @Field(() => OccasionTypeDef)
  Occasion: Occasion;
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class LoadOccasionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OccasionTypeDef)
  Occasion: Occasion;
}

@ObjectType()
export class LoadMyOccasionsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [OccasionTypeDef])
  Occasions: Occasion[];
}

@ObjectType()
export class RemoveOccasionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class AddTransactionToOccasionResponse extends RemoveOccasionResponse {}

@ObjectType()
export class FetchOccasionTransactionsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [TransactionTypeDef])
  transactions: TransactionTypeDef[];
}
