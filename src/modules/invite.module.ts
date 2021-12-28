import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from 'src/mongo-schemas/Invite.model';
import { InviteService } from 'src/services/invite.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  providers: [Invite, InviteService],
  exports: [InviteService],
})
export class InviteModule {}
