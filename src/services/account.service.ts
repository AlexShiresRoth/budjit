import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountInput } from 'src/graphql/inputs/accounts.input';
import { Account, AccountDocument } from 'src/mongo-schemas/account.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    try {
      const { name, email, password, passwordConfirm } = createAccountInput;

      if (!name) throw new Error('Please add your name');
      if (!email) throw new Error('Please add your email');
      if (!password) throw new Error('Please create a password');
      if (!passwordConfirm) throw new Error('Please confirm your password');

      const newAccount = new this.accountModel({ ...createAccountInput });

      await newAccount.save();

      return newAccount;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //locate the mongoose model
  async findOneById(id: number): Promise<Account> {
    try {
      const foundAccount = await this.accountModel.findById(id);
      return foundAccount;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
