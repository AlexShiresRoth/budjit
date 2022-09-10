import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteResolver } from 'src/graphql/resolvers/invites.resolver';
import {
  ExternalInvite,
  ExternalInviteSchema,
} from 'src/mongo-schemas/ExternalInvite';
import { ExternalInviteService } from 'src/services/externalInvite.service';
import { AccountsModule } from './account.module';
import { GroupModule } from './group.module';

@Module({
  imports: [
    forwardRef(() => AccountsModule),
    forwardRef(() => GroupModule),
    MongooseModule.forFeature([
      { name: ExternalInvite.name, schema: ExternalInviteSchema },
    ]),
  ],
  providers: [ExternalInvite, ExternalInviteService],
  exports: [ExternalInviteService],
})
export class ExternalInviteModule {}
