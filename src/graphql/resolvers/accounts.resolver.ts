import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
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
    const header: string = req.headers.authorization || '';

    if (!header) throw new Error('No token');

    const token: string = header.split(' ')[1];

    let isAuthenticated = await this.authService.verifyToken(token);

    if (!isAuthenticated) throw new Error('Could not authenticate');

    return await this.accountsService.findOneById(id);
  }

  @Query(() => LoginResponse)
  async authenticate(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.accountsService.authenticate(loginInput);
  }

  @Mutation(() => CreateAccountResponse)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountResponse> {
    return await this.accountsService.createAccount(createAccountInput);
  }
}
