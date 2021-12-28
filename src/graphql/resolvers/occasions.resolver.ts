import { UseGuards } from '@nestjs/common';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { AuthService } from 'src/services/auth.service';
import { OccasionService } from 'src/services/occasion.service';
import { AddMembersInput, CreateOccasionInput } from '../inputs/ocassion.input';
import { LoadOccasionResponse } from '../responses/occasion.response';
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
    return await this.occasionService.findOneById(id);
  }

  @Mutation(() => OccasionTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async createOccasion(
    @Args('createOccsionInput') createOccasionInput: CreateOccasionInput,
    @CurrentAccount() user: AuthPayload,
  ): Promise<Occasion> {
    return await this.occasionService.create(createOccasionInput, user);
  }

  @Mutation(() => OccasionTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async sendInvites(
    @Args('addMembersInput') addMembersInput: AddMembersInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return await this.occasionService.sendInvites(addMembersInput, user);
  }
}
