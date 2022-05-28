import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from 'src/mongo-schemas/transaction.model';

@ObjectType()
export class TransactionType {
  @Field()
  title: string;
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
}

@ObjectType()
export class CreateTransactionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => TransactionType)
  Transaction: Transaction;
}

@ObjectType()
export class GetAllTransactionsResponse {
  @Field(() => [TransactionType])
  transactions: TransactionType[];
  @Field()
  message: string;
  @Field()
  success: boolean;
}
