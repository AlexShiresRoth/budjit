import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupResolver } from 'src/graphql/resolvers/groups.resolver';
import { Group, GroupSchema } from 'src/mongo-schemas/group.model';
import { GroupService } from 'src/services/group.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';
import { ExternalInviteModule } from './externalInvite.module';
import { InviteModule } from './invite.module';
import { ProfileModule } from './profile.module';
import { UnsplashModule } from './unsplash.module';
import { UpdateModule } from './update.module';

@Module({
  imports: [
    AuthModule,
    UnsplashModule,
    forwardRef(() => ProfileModule),
    forwardRef(() => AccountsModule),
    forwardRef(() => InviteModule),
    forwardRef(() => ExternalInviteModule),
    forwardRef(() => UpdateModule),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService, Group, GroupResolver],
  exports: [GroupService],
})
export class GroupModule {}
