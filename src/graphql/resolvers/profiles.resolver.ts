import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Profile } from 'src/mongo-schemas/profile.model';
import { ProfileService } from 'src/services/profile.service';
import {
  FindProfileByEmailInput,
  ProfileInput,
  UpdateProfileInput,
} from '../inputs/profile.input';
import { FindProfileByEmailResponse } from '../responses/profile.response';
import { ProfileTypeDef } from '../schemas/profile.schema';

@Resolver(() => ProfileTypeDef)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async loadMyProfile(@CurrentAccount() user: AuthPayload): Promise<Profile> {
    return this.profileService.findOneById(user.account.id);
  }

  @Query(() => FindProfileByEmailResponse)
  async findProfileByEmail(@Args('input') input: FindProfileByEmailInput) {
    return this.profileService.findOneByEmail(input);
  }

  @Mutation(() => ProfileTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async create(
    @CurrentAccount() user: AuthPayload,
    @Args('createProfileInput') createProfileInput: ProfileInput,
  ): Promise<Profile> {
    return this.profileService.create({
      accountId: user.account.id,
      ...createProfileInput,
    });
  }

  @Mutation(() => ProfileTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async update(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(updateProfileInput);
  }
}
