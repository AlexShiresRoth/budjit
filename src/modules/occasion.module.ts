import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OccasionResolver } from 'src/graphql/resolvers/occasions.resolver';
import { Occasion, OccasionSchema } from 'src/mongo-schemas/occasion.model';
import { OccasionService } from 'src/services/occasion.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';
import { ExternalInviteModule } from './externalInvite.module';
import { GroupModule } from './group.module';
import { HistoryModule } from './history.module';
import { InviteModule } from './invite.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    InviteModule,
    GroupModule,
    HistoryModule,
    ExternalInviteModule,
    MongooseModule.forFeature([
      { name: Occasion.name, schema: OccasionSchema },
    ]),
  ],
  providers: [OccasionService, OccasionResolver, Occasion],
  exports: [OccasionService],
})
export class OccasionModule {}
