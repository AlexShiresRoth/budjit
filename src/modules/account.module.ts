import { Module } from '@nestjs/common';
import { AccountsResolver } from 'src/graphql/resolvers/accounts.resolver';
import { Account } from 'src/mongo-schemas/account.model';
import { Profile } from 'src/mongo-schemas/profile.model';
import { AccountsService } from 'src/services/account.service';

@Module({
  imports: [Profile],
  providers: [AccountsService, AccountsResolver, Account],
  exports: [AccountsService],
})
export class AccountsModule {}
