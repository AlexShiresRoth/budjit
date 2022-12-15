import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpendingResolver } from 'src/graphql/resolvers/spending.resolver';
import { TransactionResolver } from 'src/graphql/resolvers/transactions.resolver';
import {
  Transaction,
  TransactionSchema,
} from 'src/mongo-schemas/transaction.model';
import { SpendingService } from 'src/services/spending.service';
import { TransactionService } from 'src/services/transaction.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';
import { OccasionModule } from './occasion.module';
import { UpdateModule } from './update.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => OccasionModule),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [
    SpendingResolver,
    SpendingService,
    TransactionService,
    TransactionResolver,
  ],
  exports: [SpendingService, TransactionService],
})
export class SpendingModule {}
