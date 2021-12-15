import { Args, Resolver, Int, Query, Mutation } from '@nestjs/graphql';
import { AccountsService } from 'src/services/account.service';
import { AccountTypeDef } from '../schemas/account.schema';

@Resolver((of) => AccountTypeDef)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query((returns) => AccountTypeDef)
  async account(@Args('id', { type: () => Int }) id: number) {
    return this.accountsService.findOneById(id);
  }
}
