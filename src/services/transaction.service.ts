import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionInput } from 'src/graphql/inputs/transactions.input';
import { CreateTransactionResponse } from 'src/graphql/responses/transaction.response';
import {
  Transaction,
  TransactionDocumentType,
} from 'src/mongo-schemas/transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly TransactionModel: Model<TransactionDocumentType>,
  ) {}

  async createTransaction(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionResponse> {
    try {
      const newTransaction = new this.TransactionModel({ ...input });

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
