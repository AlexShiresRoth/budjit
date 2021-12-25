import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Account } from 'src/mongo-schemas/account.model';
import { AccountsService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { CreateAccountInput, LoginInput } from '../inputs/accounts.input';
import {
  CreateAccountResponse,
  LoginResponse,
} from '../responses/account.response';
import { AccountTypeDef } from '../schemas/account.schema';

@Resolver(() => AccountTypeDef)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService,
    private authService: AuthService,
  ) {}

  @Query(() => AccountTypeDef)
  async account(@Args('id') id: string, @Context('req') req: any) {
    let isAuthenticated = await this.authService.verifyToken(req);

    if (!isAuthenticated) throw new Error('Could not authenticate');

    return await this.accountsService.findOneById(id);
  }

  @Query(() => LoginResponse)
  async authenticate(@Args('loginInput') loginInput: LoginInput) {
    return this.accountsService.authenticate(loginInput);
  }

  @Query(() => AccountTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async findMyAccount(@CurrentAccount() user: AuthPayload) {
    return this.accountsService.findOneById(user.account.id);
  }

  @Mutation(() => CreateAccountResponse)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return await this.accountsService.createAccount(createAccountInput);
  }
}
