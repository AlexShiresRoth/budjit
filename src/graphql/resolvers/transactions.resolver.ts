import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { TransactionService } from 'src/services/transaction.service';
import { CreateTransactionInput } from '../inputs/transactions.input';
import { CreateTransactionResponse } from '../responses/transaction.response';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => CreateTransactionResponse)
  @UseGuards(GraphqlAuthGuard)
  async createTransaction(
    @Args('input') input: CreateTransactionInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return this.transactionService.createTransaction({ ...input, ...user });
  }
}
