import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { GroupService } from 'src/services/group.service';
import { LoadGroupInput } from '../inputs/group.input';
import { LoadGroupResponse } from '../responses/group.response';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => LoadGroupResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadGroup(@Args('input') input: LoadGroupInput) {
    return await this.groupService.findOneById(input.groupID);
  }
}
