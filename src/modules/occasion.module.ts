import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OccasionResolver } from 'src/graphql/resolvers/occasions.resolver';
import { Occasion, OccasionSchema } from 'src/mongo-schemas/occasion.model';
import { OccasionService } from 'src/services/occasion.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';
import { ExternalInviteModule } from './externalInvite.module';
import { GroupModule } from './group.module';
import { InviteModule } from './invite.module';
import { SpendingModule } from './spending.module';
import { UpdateModule } from './update.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => SpendingModule),
    InviteModule,
    GroupModule,
    ExternalInviteModule,
    UpdateModule,
    MongooseModule.forFeature([
      { name: Occasion.name, schema: OccasionSchema },
    ]),
  ],
  providers: [OccasionService, OccasionResolver, Occasion],
  exports: [OccasionService],
})
export class OccasionModule {}
