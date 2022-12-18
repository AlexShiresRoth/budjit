import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from 'src/mongo-schemas/transaction.model';
import { TransactionTypeDef } from '../schemas/transactions.schema';

@ObjectType()
export class BaseResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class CreateTransactionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => TransactionTypeDef)
  Transaction: Transaction;
}

@ObjectType()
export class GetAllTransactionsResponse {
  @Field(() => [TransactionTypeDef])
  transactions: Transaction[];
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class DeleteTransactionResponse extends BaseResponse {}

@ObjectType()
export class BatchFetchTransactionsResponse extends BaseResponse {
  @Field(() => [TransactionTypeDef])
  transactions: Transaction[];
}
