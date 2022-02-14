import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddGroupRefToAccountInput,
  AddInviteToAccountInput,
  CreateAccountInput,
  LoginInput,
} from 'src/graphql/inputs/accounts.input';
import * as bcrypt from 'bcryptjs';
import { Account, AccountDocument } from 'src/mongo-schemas/account.model';
import {
  AddGroupToAccountResponse,
  AddInviteToAccountResponse,
  CreateAccountResponse,
  LoginResponse,
} from 'src/graphql/responses/account.response';
import { AuthService } from './auth.service';
import * as mongoose from 'mongoose';
import { AddOccasionDTO } from 'src/graphql/dto/accounts.dto';
import { ProfileService } from './profile.service';
import { MyProfile } from 'src/interfaces/profile.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly authServices: AuthService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
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

      //generate a default profile as a base
      const newProfile: MyProfile = await this.profileService.create({
        name,
        avatar: null,
        accountId: newAccount._id,
      });

      //add profile id to account
      //TODO perhaps come up with another way.
      //This does not return the profile in the query GQL
      newAccount.profile = newProfile._id;

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

  async addInvite(
    input: AddInviteToAccountInput,
  ): Promise<AddInviteToAccountResponse> {
    const { invite, receiver } = input;

    const myAccount = await this.accountModel.findOne({ email: receiver });

    if (!myAccount) {
      //if no acocunt exists, send an email to the email

      return {
        message: 'Could not locate an account',
        success: false,
        Account: null,
      };
    }

    myAccount.invites.push(invite);

    await myAccount.save();

    return {
      message: 'Added invite to account',
      success: true,
      Account: myAccount,
    };
  }

  async addGroupRefToAccount(
    input: AddGroupRefToAccountInput,
  ): Promise<AddGroupToAccountResponse> {
    try {
      const { groupId, userID } = input;

      const myAccount = await this.accountModel.findById(userID);

      if (!myAccount) throw new NotFoundException('Could not locate account');

      myAccount.groups.push(groupId);

      await myAccount.save();

      return {
        message: 'Added group to account',
        success: true,
        account: myAccount,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async addProfileToAccount(input: {
    profile_id: string;
    account_id: string;
  }): Promise<Account> {
    try {
      const { profile_id, account_id } = input;
      console.log('is this reaching', profile_id, account_id);
      const myAccount = await this.accountModel.findById(account_id);

      myAccount.profile = profile_id;

      await myAccount.save();

      return myAccount;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
