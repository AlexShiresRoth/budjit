import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { TransactionService } from 'src/services/transaction.service';
import {
  CreateTransactionInput,
  DeleteTransactionInput,
  EditTransactionInput,
} from '../inputs/transactions.input';
import {
  CreateTransactionResponse,
  DeleteTransactionResponse,
  GetAllTransactionsResponse,
} from '../responses/transaction.response';

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

  @Mutation(() => CreateTransactionResponse)
  @UseGuards(GraphqlAuthGuard)
  async editTransaction(
    @Args('input') input: EditTransactionInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.transactionService.editTransaction(input, user);
  }

  @Mutation(() => DeleteTransactionResponse)
  @UseGuards(GraphqlAuthGuard)
  async deleteTransaction(
    @Args('input') input: DeleteTransactionInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.transactionService.deleteTransaction(input, user);
  }

  @Query(() => GetAllTransactionsResponse)
  @UseGuards(GraphqlAuthGuard)
  async getAllManualTransactions(@CurrentAccount() user: AuthPayload) {
    return await this.transactionService.getAllTransactions(user);
  }
}
