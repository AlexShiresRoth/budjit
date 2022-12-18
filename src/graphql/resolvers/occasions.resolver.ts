import { UseGuards } from '@nestjs/common';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { OccasionService } from 'src/services/occasion.service';
import {
  ContributeToBudgetInput,
  CreateOccasionInput,
  FetchOccasionTransactionsInput,
  LoadOccasionInput,
  RemoveOccasionInput,
} from '../inputs/ocassion.input';
import {
  CreateOccasionResponse,
  FetchOccasionTransactionsResponse,
  LoadMyOccasionsResponse,
  LoadOccasionResponse,
  RemoveOccasionResponse,
} from '../responses/occasion.response';
import { OccasionTypeDef } from '../schemas/occasion.schema';

@Resolver(() => OccasionTypeDef)
export class OccasionResolver {
  constructor(private readonly occasionService: OccasionService) {}

  @Query(() => LoadOccasionResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadOccasion(@Args('input') input: LoadOccasionInput) {
    return await this.occasionService.findOneById(input);
  }

  @Query(() => LoadMyOccasionsResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadMyOccasions(@CurrentAccount() user: AuthPayload) {
    return this.occasionService.findAll(user.account.id);
  }

  //query to fetch an array of transactions within an occasion
  @Query(() => FetchOccasionTransactionsResponse)
  @UseGuards(GraphqlAuthGuard)
  async batchFetchOccasionTransactions(
    @Args('input') input: FetchOccasionTransactionsInput,
  ) {
    return await this.occasionService.fetchOccasionTransactions(input);
  }

  @Mutation(() => CreateOccasionResponse)
  @UseGuards(GraphqlAuthGuard)
  async createOccasion(
    @Args('input') createOccasionInput: CreateOccasionInput,
    @CurrentAccount() user: AuthPayload,
  ): Promise<CreateOccasionResponse> {
    return await this.occasionService.create(createOccasionInput, user);
  }

  @Mutation(() => OccasionTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async contributeToBudget(
    @Args('contributeToBudgetInput')
    contributeToBudgetInput: ContributeToBudgetInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.occasionService.contributeToBudget(
      contributeToBudgetInput,
      user,
    );
  }

  @Mutation(() => RemoveOccasionResponse)
  @UseGuards(GraphqlAuthGuard)
  async removeOccasion(
    @Args('input') input: RemoveOccasionInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.occasionService.removeOccasion(input, user);
  }
}
