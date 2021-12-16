import { Args, Resolver, Int, Query, Mutation } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { AccountsService } from 'src/services/account.service';
import { CreateAccountInput } from '../inputs/accounts.input';
import { AccountTypeDef } from '../schemas/account.schema';

@Resolver(() => AccountTypeDef)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(() => AccountTypeDef)
  async account(@Args('id', { type: () => Int }) id: number) {
    return await this.accountsService.findOneById(id);
  }

  @Mutation(() => AccountTypeDef)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ): Promise<AccountTypeDef> {
    return await this.accountsService.createAccount(createAccountInput);
  }
}
