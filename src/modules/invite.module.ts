import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteResolver } from 'src/graphql/resolvers/invites.resolver';
import { Invite, InviteSchema } from 'src/mongo-schemas/Invite.model';
import { InviteService } from 'src/services/invite.service';
import { AccountsModule } from './account.module';
import { GroupModule } from './group.module';

@Module({
  imports: [
    forwardRef(() => AccountsModule),
    forwardRef(() => GroupModule),
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  providers: [Invite, InviteService, InviteResolver],
  exports: [InviteService],
})
export class InviteModule {}
