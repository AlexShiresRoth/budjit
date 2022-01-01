import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAccountInput,
  LoginInput,
} from 'src/graphql/inputs/accounts.input';
import * as bcrypt from 'bcryptjs';
import { Account, AccountDocument } from 'src/mongo-schemas/account.model';
import {
  CreateAccountResponse,
  LoginResponse,
} from 'src/graphql/responses/account.response';
import { AuthService } from './auth.service';
import * as mongoose from 'mongoose';
import { AddInviteDTO, AddOccasionDTO } from 'src/graphql/dto/accounts.dto';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { InviteService } from './invite.service';
import { UpdateInvite } from 'src/graphql/dto/invite.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly authServices: AuthService,
    @Inject(forwardRef(() => InviteService))
    private readonly inviteService: InviteService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountResponse> {
    try {
      const { name, email, password, passwordConfirm } = createAccountInput;

      if (!name) throw new Error('Please add your name');
      if (!email) throw new Error('Please add your email');
      if (!password) throw new Error('Please create a password');
      if (!passwordConfirm) throw new Error('Please confirm your password');

      if (password !== passwordConfirm)
        throw new Error('Passwords do not match');

      //declare explicit id for accessing within the model
      //This seems hacky
      const id = new mongoose.Types.ObjectId();

      let accountRequest: {
        name: string;
        email: string;
        password: string;
        _id: typeof id;
      } = {
        name: '',
        email: '',
        password: '',
        _id: id,
      };

      if (name) accountRequest.name = name;
      if (email) accountRequest.email = email;

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      if (hash) accountRequest.password = hash;

      const newAccount = new this.accountModel({ ...accountRequest });

      await newAccount.save();

      const payload = {
        account: {
          id: newAccount._id,
        },
      };

      const token: string = await this.authServices.signToken(payload);

      return { Account: newAccount, token };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //locate the mongoose model
  async findOneById(id: string): Promise<Account> {
    try {
      const foundAccount = await this.accountModel.findById(id);
      return foundAccount;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOneByEmail(email: string): Promise<Account> {
    try {
      const foundAccount = await this.accountModel.findOne({ email });

      return foundAccount;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async authenticate(loginInput: LoginInput): Promise<LoginResponse> {
    try {
      const { password, email } = loginInput;

      const foundAccount = await this.accountModel.findOne({ email });

      if (!foundAccount)
        throw new Error('Could not locate an account with this email');

      const match = await bcrypt.compare(password, foundAccount.password);

      if (!match) throw new Error('Password is incorrect ');

      const payload = {
        account: {
          id: foundAccount._id,
        },
      };

      const token: string = await this.authServices.signToken(payload);

      return {
        Account: foundAccount,
        token,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addOccasion(input: AddOccasionDTO): Promise<Account> {
    const { occasion, userID } = input;

    const myAccount = await this.accountModel.findById(userID);

    myAccount.occasions.push(occasion);

    await myAccount.save();

    return myAccount;
  }

  async addInvite(input: AddInviteDTO): Promise<Account> {
    const { invite, userID } = input;

    const myAccount = await this.accountModel.findById(userID);

    myAccount.invites.push(invite);

    await myAccount.save();

    return myAccount;
  }
}
