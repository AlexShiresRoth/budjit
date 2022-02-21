import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupResolver } from 'src/graphql/resolvers/groups.resolver';
import { Group, GroupSchema } from 'src/mongo-schemas/group.model';
import { GroupService } from 'src/services/group.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';
import { InviteModule } from './invite.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => AccountsModule),
    forwardRef(() => InviteModule),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService, Group, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
