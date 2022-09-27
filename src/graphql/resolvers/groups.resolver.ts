import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { GroupService } from 'src/services/group.service';
import {
  CreateGroupInput,
  DeleteGroupInput,
  FetchGroupMembersInput,
  LoadGroupInput,
  UpdateGroupInput,
} from '../inputs/group.input';
import {
  CreateGroupResponse,
  DeleteGroupResponse,
  FetchGroupMemberAccountsResponse,
  FetchGroupsResponse,
  LoadGroupResponse,
  UpdateGroupResponse,
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

  @Query(() => FetchGroupMemberAccountsResponse)
  @UseGuards(GraphqlAuthGuard)
  async fetchGroupMembers(@Args('input') input: FetchGroupMembersInput) {
    return await this.groupService.fetchGroupMembers(input);
  }

  @Mutation(() => CreateGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async createGroup(
    @Args('input') input: CreateGroupInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.groupService.create({
      ...input,
      creator: user.account.id,
    });
  }

  @Mutation(() => CreateGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async changeGroupBackgroundImage(
    @Args('input') input: FetchGroupMembersInput,
  ) {
    return await this.groupService.changeBackgroundImage(input.groupID);
  }

  @Mutation(() => DeleteGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async deleteGroup(
    @Args('input') input: DeleteGroupInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.groupService.deleteGroupById({
      groupID: input.groupID,
      creatorID: user.account.id,
    });
  }

  @Mutation(() => UpdateGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async updateGroup(
    @Args('input') input: UpdateGroupInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.groupService.updateGroup(input, user);
  }
}
