import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsResolver } from 'src/graphql/resolvers/accounts.resolver';
import { Account, AccountSchema } from 'src/mongo-schemas/account.model';
import { AccountsService } from 'src/services/account.service';
import { AuthModule } from './auth.module';
import { InviteModule } from './invite.module';
import { ProfileModule } from './profile.module';

@Module({
  imports: [
    forwardRef(() => InviteModule),
    forwardRef(() => ProfileModule),
    AuthModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountsService, AccountsResolver, Account],
  exports: [AccountsService],
})
export class AccountsModule {}
