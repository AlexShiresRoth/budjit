import { UseGuards } from '@nestjs/common';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AuthService } from 'src/services/auth.service';
import { OccasionService } from 'src/services/occasion.service';
import {
  AddMembersInput,
  ContributeToBudgetInput,
  CreateOccasionInput,
  LoadOccasionInput,
  RemoveOccasionInput,
} from '../inputs/ocassion.input';
import {
  CreateOccasionResponse,
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
