import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionInput } from 'src/graphql/inputs/transactions.input';
import { CreateTransactionResponse } from 'src/graphql/responses/transaction.response';
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
      const { account, accountType, title, category, date, total, location } =
        input;

      console.log('input?', input);

      const newTransaction = new this.TransactionModel({
        accountType,
        title,
        category,
        date,
        total,
        location,
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
}
