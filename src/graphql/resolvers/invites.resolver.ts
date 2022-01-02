import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { AccountsService } from 'src/services/account.service';
import { InviteService } from 'src/services/invite.service';
import { UpdateInviteStatusInput } from '../inputs/invite.input';
import { InvitesTypeDef } from '../schemas/invite.schema';

@Resolver(() => InvitesTypeDef)
export class InviteResolver {
  constructor(
    private readonly inviteService: InviteService,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}

  @Query(() => [InvitesTypeDef])
  @UseGuards(GraphqlAuthGuard)
  async loadMyInvites(@CurrentAccount() user: AuthPayload) {
    return this.inviteService.loadMyInvites(user.account.id);
  }

  @Mutation(() => InvitesTypeDef)
  @UseGuards(GraphqlAuthGuard)
  async updateInviteStatus(
    @Args('updateInviteStatusInput')
    updateInviteStatusInput: UpdateInviteStatusInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    const data = { ...updateInviteStatusInput, userID: user.account.id };
    return this.inviteService.updateStatus({ ...data });
  }
}
