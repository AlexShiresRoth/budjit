import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileResolver } from 'src/graphql/resolvers/profiles.resolver';
import { Profile, ProfileSchema } from 'src/mongo-schemas/profile.model';
import { ProfileService } from 'src/services/profile.service';
import { AccountsModule } from './account.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => AccountsModule),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService, ProfileResolver, Profile],
  exports: [ProfileService],
})
export class ProfileModule {}
