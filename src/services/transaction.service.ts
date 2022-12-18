import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BatchFetchTransactionsInput,
  CreateTransactionInput,
  DeleteTransactionInput,
  EditTransactionInput,
} from 'src/graphql/inputs/transactions.input';
import {
  BatchFetchTransactionsResponse,
  CreateTransactionResponse,
  GetAllTransactionsResponse,
} from 'src/graphql/responses/transaction.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import {
  Transaction,
  TransactionDocumentType,
} from 'src/mongo-schemas/transaction.model';
import { AccountsService } from './account.service';
import { OccasionService } from './occasion.service';
import { UpdateService } from './update.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly TransactionModel: Model<TransactionDocumentType>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => OccasionService))
    private readonly occasionService: OccasionService,
  ) {}

  async createTransaction(
    input: CreateTransactionInput & AuthPayload,
  ): Promise<CreateTransactionResponse> {
    try {
      const {
        account,
        accountType,
        name,
        category,
        date,
        amount,
        location,
        occasionRef,
      } = input;

      const newTransaction = new this.TransactionModel({
        accountType,
        name,
        category,
        date,
        amount,
        location,
        account_id: 'manual_transaction',
        personAccountRef: account.id,
      });

      //only set this ref if it's coming from an occasion
      if (occasionRef) newTransaction.occasionRef = occasionRef;

      await newTransaction.save();

      //have to wait after saving transaction in order to retrieve the id
      if (occasionRef) {
        //update the occasion with the newly created transaction
        //need to pass transaction amount as well in order to update the total amount
        await this.occasionService.addTransaction(
          {
            occasionRef,
            transactionRef: newTransaction,
            transactionAmount: amount,
          },
          { account: account },
        );
      }

      //add transaction to user account
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

  //fetching transactions from an array containing ids
  async batchFetchTransactions(
    input: BatchFetchTransactionsInput,
  ): Promise<BatchFetchTransactionsResponse> {
    try {
      const { ids } = input;

      const foundTransactions = await this.TransactionModel.find({
        _id: { $in: ids },
      });

      return {
        message: 'Fetched transactions',
        success: true,
        transactions: foundTransactions,
      };
    } catch (error) {
      console.error('Error fetching transactions', error);
      return {
        message: 'Error fetching transactions',
        success: false,
        transactions: [],
      };
    }
  }

  //@TODO:need to configure edit transaction for occasions
  async editTransaction(
    input: EditTransactionInput,
    user: AuthPayload,
  ): Promise<CreateTransactionResponse> {
    try {
      const { _id, name, category, date, amount, location, accountType } =
        input;

      const myAccount = await this.accountService.findOneById(user.account.id);

      const myTransactions = myAccount.transactions.map((transaction) =>
        transaction._id.toString(),
      );

      const existsOnMyAccount = myTransactions.includes(_id.toString());

      if (!existsOnMyAccount)
        throw new Error('Transaction not found on my account');

      //I dont know why, but not giving these types produces an error stating that location is a string &
      // Location-LOCATION IS NOT DEFINED ANYWHERE
      const foundTransaction: Document & TransactionDocumentType & any =
        await this.TransactionModel.findById(_id);

      if (!foundTransaction)
        throw new Error('Transaction not found in database');

      if (name) foundTransaction.name = name;
      if (category) foundTransaction.category = category;
      if (date) foundTransaction.date = date;
      if (amount) foundTransaction.amount = amount;
      if (location) foundTransaction.location = location;
      if (accountType) foundTransaction.accountType = accountType;

      await foundTransaction.save();

      console.log('updated transaction', foundTransaction, input);

      return {
        message: 'Updated transaction',
        success: true,
        Transaction: foundTransaction,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: false,
        Transaction: null,
      };
    }
  }

  async deleteTransaction(input: DeleteTransactionInput, user: AuthPayload) {
    try {
      const { _id } = input;
      const myAccount = await this.accountService.findOneById(user.account.id);

      if (!myAccount) throw new Error('Could not locate an account');

      const myTransactions = myAccount.transactions.map((transaction) =>
        transaction._id.toString(),
      );

      const indexOfTransaction = myTransactions.indexOf(_id.toString());

      if (indexOfTransaction === -1)
        throw new Error('Transaction not found on my account');

      const removeTransactionFromAccount =
        await this.accountService.removeTransactionFromAccount(
          _id,
          myAccount._id,
        );

      if (removeTransactionFromAccount.success === false)
        throw new Error('Could not remove transaction from account');

      const foundTransaction = await this.TransactionModel.findById(input._id);

      if (!foundTransaction) throw new Error('Transaction not found');

      await foundTransaction.remove();

      return {
        message: 'Deleted transaction',
        success: true,
        Transaction: foundTransaction,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: false,
        Transaction: null,
      };
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
