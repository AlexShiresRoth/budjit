import { Module } from '@nestjs/common';
import { SpendingResolver } from 'src/graphql/resolvers/spending.resolver';
import { SpendingService } from 'src/services/spending.service';

@Module({
  providers: [SpendingResolver, SpendingService],
  exports: [SpendingService],
})
export class SpendingModule {}
