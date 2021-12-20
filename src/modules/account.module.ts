import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsResolver } from 'src/graphql/resolvers/accounts.resolver';
import { Account, AccountSchema } from 'src/mongo-schemas/account.model';
import { Profile } from 'src/mongo-schemas/profile.model';
import { AccountsService } from 'src/services/account.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    Profile,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountsService, AccountsResolver, Account],
  exports: [AccountsService],
})
export class AccountsModule {}
