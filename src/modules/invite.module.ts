import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from 'src/mongo-schemas/Invite.model';
import { InviteService } from 'src/services/invite.service';
import { AccountsModule } from './account.module';

@Module({
  imports: [
    AccountsModule,
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  providers: [Invite, InviteService],
  exports: [InviteService],
})
export class InviteModule {}
