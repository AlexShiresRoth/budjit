import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ExternalInviteService } from 'src/services/externalInvite.service';
import { FetchExternalInviteInput } from '../inputs/externalInvite.input';
import { FetchExternalInviteResponse } from '../responses/externalInvite.response';
import { ExternalInviteTypeDef } from '../schemas/externalInvite.schema';

@Resolver(() => ExternalInviteTypeDef)
export class ExternalInvitesResolver {
  constructor(private readonly externalInviteService: ExternalInviteService) {}

  @Query(() => FetchExternalInviteResponse)
  @UseGuards(GraphqlAuthGuard)
  async fetchExternalInvite(
    @Args('input') input: FetchExternalInviteInput,
    @CurrentAccount() user: any,
  ) {
    return this.externalInviteService.fetchInvite(input);
  }
}
