import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Resolver, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Account } from 'src/mongo-schemas/account.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AuthService } from 'src/services/auth.service';
import { OccasionService } from 'src/services/occasion.service';
import { CreateOccasionInput } from '../inputs/ocassion.input';
import {
  CreateOccasionResponse,
  LoadOccasionResponse,
} from '../responses/occasion.response';
import { OccasionTypeDef } from '../schemas/occasion.schema';

@Resolver(() => OccasionTypeDef)
export class OccasionResolver {
  constructor(
    private readonly occasionService: OccasionService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => LoadOccasionResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadOccasion(
    @Args('id') id: string,
    @CurrentAccount() user: AuthPayload,
  ) {
    console.log('req?', user);

    return await this.occasionService.findOneById(id);
  }

  @Mutation(() => CreateOccasionResponse)
  @UseGuards(GraphqlAuthGuard)
  async createOccasion(
    @Args('createOccsionInput') createOccasionInput: CreateOccasionInput,
    @CurrentAccount() user: AuthPayload,
  ): Promise<Occasion> {
    return await this.occasionService.create(createOccasionInput, user);
  }
}
