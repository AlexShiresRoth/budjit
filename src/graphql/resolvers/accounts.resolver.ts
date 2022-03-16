import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { AccountsService } from 'src/services/account.service';
import {
  CreateAccountInput,
  ExchangePublicTokenInput,
  GetPlaidInstitutionInput,
  LoadPlaidAccountDataInput,
  LoginInput,
} from '../inputs/accounts.input';
import {
  CreateAccountResponse,
  GetPlaidInstitutionResponse,
  LoadPlaidAccountDataResponse,
  LoadPlaidAccountsResponse,
  LoginResponse,
  RetrievePlaidAuthTokenResponse,
  RetrievePlaidPublicTokenResponse,
} from '../responses/account.response';
import { AccountTypeDef } from '../schemas/account.schema';

@Resolver(() => AccountTypeDef)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(() => AccountTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async account(@Args('id') id: string, @CurrentAccount() user: AuthPayload) {
    return await this.accountsService.findOneById(user.account.id);
  }

  @Query(() => AccountTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async findMyAccount(@CurrentAccount() user: AuthPayload) {
    return this.accountsService.findOneById(user.account.id);
  }

  @Query(() => LoadPlaidAccountsResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadPlaidAccounts(@CurrentAccount() user: AuthPayload) {
    return this.accountsService.loadPlaidAccounts(user.account.id);
  }

  @Query(() => LoadPlaidAccountDataResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadPlaidData(
    @Args('input') input: LoadPlaidAccountDataInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return this.accountsService.loadPlaidAccountData(input);
  }

  @Query(() => GetPlaidInstitutionResponse)
  @UseGuards(GraphqlAuthGuard)
  async getPlaidInstitution(@Args('input') input: GetPlaidInstitutionInput) {
    return this.accountsService.getPlaidInstitution(input);
  }

  @Mutation(() => RetrievePlaidAuthTokenResponse)
  @UseGuards(GraphqlAuthGuard)
  async retrievePlaidAuthToken(@CurrentAccount() user: AuthPayload) {
    return this.accountsService.retrievePlaidAuthToken();
  }

  @Mutation(() => LoginResponse)
  async authenticate(@Args('loginInput') loginInput: LoginInput) {
    return this.accountsService.authenticate(loginInput);
  }

  @Mutation(() => CreateAccountResponse)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return await this.accountsService.createAccount(createAccountInput);
  }

  @Mutation(() => RetrievePlaidPublicTokenResponse)
  @UseGuards(GraphqlAuthGuard)
  async publicTokenExchange(
    @Args('input') input: ExchangePublicTokenInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return this.accountsService.exchangePublicToken({
      ...input,
      userId: user.account.id,
    });
  }
}
