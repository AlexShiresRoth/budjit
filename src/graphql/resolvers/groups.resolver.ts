import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { GroupService } from 'src/services/group.service';
import { CreateGroupInput, LoadGroupInput } from '../inputs/group.input';
import {
  CreateGroupResponse,
  FetchGroupsResponse,
  LoadGroupResponse,
} from '../responses/group.response';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => LoadGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadGroup(@Args('input') input: LoadGroupInput) {
    return await this.groupService.findOneById(input.groupID);
  }
  @Query(() => FetchGroupsResponse)
  @UseGuards(GraphqlAuthGuard)
  async fetchGroups(@CurrentAccount() user) {
    return await this.groupService.fetchMyGroups(user);
  }

  @Mutation(() => CreateGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async createGroup(
    @Args('input') input: CreateGroupInput,
    @CurrentAccount() user,
  ) {
    return await this.groupService.create({
      ...input,
      creator: user.account.id,
    });
  }
}
