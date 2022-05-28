import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionInput } from 'src/graphql/inputs/transactions.input';
import {
  CreateTransactionResponse,
  GetAllTransactionsResponse,
} from 'src/graphql/responses/transaction.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import {
  Transaction,
  TransactionDocumentType,
} from 'src/mongo-schemas/transaction.model';
import { AccountsService } from './account.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly TransactionModel: Model<TransactionDocumentType>,
    private readonly accountService: AccountsService,
  ) {}

  async createTransaction(
    input: CreateTransactionInput & AuthPayload,
  ): Promise<CreateTransactionResponse> {
    try {
      const { account, accountType, title, category, date, amount, location } =
        input;

      console.log('input?', input);

      const newTransaction = new this.TransactionModel({
        accountType,
        title,
        category,
        date,
        amount,
        location,
        account_id: 'manual_transaction',
      });

      await newTransaction.save();

      if (newTransaction)
        await this.accountService.addManualTransaction(
          newTransaction,
          account.id,
        );

      return {
        message: 'Created a new transaction',
        success: true,
        Transaction: newTransaction,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async getAllTransactions(
    input: AuthPayload,
  ): Promise<GetAllTransactionsResponse> {
    try {
      const myAccount = await this.accountService.findOneById(input.account.id);

      if (!myAccount) throw new Error('Could not locate an account');

      const foundTransactions = await Promise.all(
        myAccount.transactions.map(async (transaction) => {
          try {
            console.log('transaction', transaction);
            const foundTransaction = await this.TransactionModel.findById(
              transaction,
            );
            return foundTransaction;
          } catch (error) {
            console.error(error);
            return null;
          }
        }),
      );

      const transactions = foundTransactions.filter(
        (foundTransaction) => foundTransaction !== null,
      );

      console.log('found transactions', transactions);

      return {
        success: true,
        message: 'Successfully retrieved transactions',
        transactions,
      };
    } catch (error) {
      console.error('Retrieving manual transactions error', error);
      return {
        message: error,
        success: false,
        transactions: [],
      };
    }
  }
}
