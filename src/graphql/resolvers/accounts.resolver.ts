import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { AccountsService } from 'src/services/account.service';
import { CreateAccountInput, LoginInput } from '../inputs/accounts.input';
import {
  CreateAccountResponse,
  LoginResponse,
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
}
