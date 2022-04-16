import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { SpendingService } from 'src/services/spending.service';
import { SetTimeFrameInput } from '../inputs/spending.input';
import { SetTimeFrameResponse } from '../responses/spending.response';

@Resolver()
export class SpendingResolver {
  constructor(private readonly spendingService: SpendingService) {}

  @Mutation(() => SetTimeFrameResponse)
  @UseGuards(GraphqlAuthGuard)
  async setTimeFrame(@Args('input') input: SetTimeFrameInput) {
    return await this.spendingService.setTimeFrame(input);
  }
}
