import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { UpdateService } from 'src/services/update.service';
import { FetchUpdateInput } from '../inputs/update.input';
import { FetchUpdateResponse } from '../responses/update.response';

@Resolver()
export class UpdateResolver {
  constructor(private readonly updateService: UpdateService) {}

  @Query(() => FetchUpdateResponse)
  @UseGuards(GraphqlAuthGuard)
  async fetchUpdate(@Args('input') input: FetchUpdateInput) {
    return await this.updateService.fetchUpdate(input);
  }
}
