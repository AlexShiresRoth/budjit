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
  ExchangePublicTokenInput,
  GetPlaidInstitutionInput,
  GetPlaidTransactionsInput,
  LoadPlaidAccountDataInput,
  LoginInput,
} from 'src/graphql/inputs/accounts.input';
import * as bcrypt from 'bcryptjs';
import { Account, AccountDocument } from 'src/mongo-schemas/account.model';
import {
  AddGroupToAccountResponse,
  AddInviteToAccountResponse,
  CreateAccountResponse,
  DeleteInviteFromAccountResponse,
  GetPlaidInstitutionResponse,
  GetPlaidTransactionsResponse,
  LoadPlaidAccountDataResponse,
  LoadPlaidAccountsResponse,
  LoginResponse,
  RetrievePlaidAuthTokenResponse,
  RetrievePlaidPublicTokenResponse,
} from 'src/graphql/responses/account.response';
import { AuthService } from './auth.service';
import * as mongoose from 'mongoose';
import { AddOccasionDTO } from 'src/graphql/dto/accounts.dto';
import { ProfileService } from './profile.service';
import { MyProfile } from 'src/interfaces/profile.interface';
import { Invite } from 'src/mongo-schemas/Invite.model';
import {
  CountryCode,
  InstitutionsGetByIdRequest,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  PlaidApi,
  Products,
  TransactionsGetRequest,
} from 'plaid';
import { response } from 'express';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly authServices: AuthService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
    @Inject('PLAID') private readonly plaid: PlaidApi,
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

  async loadPlaidAccounts(id: string): Promise<LoadPlaidAccountsResponse> {
    try {
      const myAccount = await this.accountModel.findById(id);

      if (!myAccount) throw new Error('Could not locate an account');

      return {
        message: 'Found an account',
        success: true,
        accounts: myAccount.plaidAccounts,
      };
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
    const { invite, receiver, sender } = input;

    console.log('receiver', receiver);

    const myAccount = await this.accountModel.findById(sender._id);

    if (!myAccount) {
      //if no accaunt exists, send an email to the email
      return {
        message: 'Could not locate an account',
        success: false,
        Account: null,
      };
    }

    const receiverAccount = await this.accountModel.findOne({
      email: receiver,
    });

    if (!receiverAccount) {
      //todo send email to receiver of invite to join app
    }

    if (receiverAccount) {
      receiverAccount.receivedInvites.push(invite);

      await receiverAccount.save();
      console.log('found an account for the receiver');
    }

    ///////////////////////
    myAccount.sentInvites.push(invite);
    /////////////////////////
    await myAccount.save();
    /////////////////////
    return {
      message: 'Group invite saved in sent',
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

  async deleteInviteFromAccount(input: {
    invite_id: string;
    receiver_email: string | null;
    id: string | null;
  }): Promise<DeleteInviteFromAccountResponse> {
    try {
      const { receiver_email, invite_id, id } = input;

      //find receiver
      const foundAccount = receiver_email
        ? await this.accountModel.findOne({
            email: receiver_email,
          })
        : await this.accountModel.findById(id);

      if (!foundAccount) {
        return {
          message: 'Could not locate an account',
          success: false,
          Account: null,
        };
      }

      //if account is of the receiver
      if (receiver_email) {
        const filteredInvites = foundAccount.receivedInvites.filter(
          (invite: Invite) => {
            return invite_id !== invite._id.toString();
          },
        );

        console.log('filtered invites', filteredInvites);
        foundAccount.receivedInvites = filteredInvites;

        await foundAccount.save();
      }

      //if account is from creator
      if (id) {
        const filteredInvites = foundAccount.sentInvites.filter(
          (invite: Invite) => {
            return invite_id !== invite._id.toString();
          },
        );

        console.log('filtered invites', filteredInvites);

        foundAccount.sentInvites = filteredInvites;

        await foundAccount.save();
      }

      return {
        message: 'Removed invite from account',
        success: true,
        Account: foundAccount,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Could not remove invite from account',
        success: false,
        Account: null,
      };
    }
  }

  async retrievePlaidAuthToken(): Promise<RetrievePlaidAuthTokenResponse> {
    try {
      const request: LinkTokenCreateRequest = {
        user: {
          client_user_id: process.env.PLAID_CLIENT_ID,
        },
        client_name: 'Daydreamer Apps',
        products: [Products.Auth, Products.Transactions],
        country_codes: [Products['Us'] || 'US'],
        language: 'en',
      };

      const getCredentials = await this.plaid.linkTokenCreate(request);

      return {
        message: 'Retrieved plaid auth token',
        success: true,
        token: getCredentials.data.link_token,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Could not authorize plaid at this moment',
        success: false,
        token: '',
      };
    }
  }

  async exchangePublicToken(
    input: ExchangePublicTokenInput,
  ): Promise<RetrievePlaidPublicTokenResponse> {
    const { publicToken, userId, institutionName } = input;

    const request: ItemPublicTokenExchangeRequest = {
      public_token: publicToken,
    };
    try {
      const foundUser = await this.accountModel.findById(userId);

      if (!foundUser) throw new Error('Could not locate an account');

      const response = await this.plaid.itemPublicTokenExchange(request);
      //store the accesstoken on a user model
      const accessToken = response.data.access_token;

      const newId = new mongoose.Types.ObjectId();

      const newAccountConnect: {
        accessToken: string;
        accountName: string;
        _id: string | any;
      } = {
        accessToken,
        accountName: institutionName,
        _id: newId,
      };

      foundUser.plaidAccounts.push(newAccountConnect);

      await foundUser.save();

      const itemId = response.data.item_id;

      console.log('item id', itemId, accessToken);

      return {
        message: 'Retrieved an item from plaid',
        success: true,
        account: foundUser,
      };
    } catch (err) {
      // handle error
      return err;
    }
  }

  async loadPlaidAccountData(
    input: LoadPlaidAccountDataInput,
  ): Promise<LoadPlaidAccountDataResponse> {
    try {
      const { accessToken } = input;
      const request = await this.plaid.accountsBalanceGet({
        access_token: accessToken,
      });

      const accounts = request.data.accounts;

      console.log('data', request.data.item);
      return {
        message: 'Loaded plaid data',
        success: true,
        accounts,
        item: {
          institution_id: request.data.item.institution_id,
        },
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getPlaidInstitution(
    input: GetPlaidInstitutionInput,
  ): Promise<GetPlaidInstitutionResponse> {
    try {
      const { institution_id, country_code } = input;

      const request: InstitutionsGetByIdRequest = {
        institution_id,
        country_codes: [country_code],
        options: {
          include_optional_metadata: true,
        },
      };
      const institution = await this.plaid.institutionsGetById(request);

      console.log('institution', institution.data);

      return {
        message: 'Found institution',
        success: true,
        logo: institution.data.institution.logo,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getPlaidTransactions(
    input: GetPlaidTransactionsInput,
  ): Promise<GetPlaidTransactionsResponse> {
    try {
      const { accessToken, filter } = input;

      let startDate: string;
      let endDate: string;
      //set spending timeframe for the current week
      const setWeekAsTimeFrame = () => {
        const today = new Date();

        const start =
          today.getDate() - (today.getDay() + (today.getDay() === 0 ? -6 : 1));

        const tempDate = new Date();

        const newStart = new Date(tempDate.setDate(start + 1));

        const startString = newStart.toISOString().split('T')[0];

        const endString = today.toISOString().split('T')[0];

        startDate = startString;
        endDate = endString;
      };

      //handle timeframe by filter request
      //TODO FIX HARDCODED DATES
      switch (filter) {
        case 'Month':
          startDate = '2022-03-02';
          endDate = '2022-03-10';
          break;
        case 'Week':
          setWeekAsTimeFrame();
          break;
        case 'Year':
          startDate = '2022-03-02';
          endDate = '2022-03-10';
          break;
        default:
          setWeekAsTimeFrame();
      }

      if (!startDate || !endDate) throw new Error('Filter not properly set');

      const request: TransactionsGetRequest = {
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      };

      const client = await this.plaid.transactionsGet(request);

      const transactions = client.data.transactions;

      const totalSpent = transactions.reduce(
        (prev, next) => prev + next.amount,
        0,
      );

      console.log('transaaactons', totalSpent, accessToken);

      return {
        message: 'Transactions received',
        success: true,
        spending: totalSpent,
        id: accessToken,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
