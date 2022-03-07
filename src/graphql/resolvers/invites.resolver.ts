import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { AccountsService } from 'src/services/account.service';
import { InviteService } from 'src/services/invite.service';
import {
  DeleteSentInviteInput,
  SendInvitesToNewGroupInput,
  UpdateInviteStatusInput,
} from '../inputs/invite.input';
import {
  CreateInvitesResponse,
  DeleteSentInviteResponse,
  LoadGroupInvitesResponse,
  LoadReceivedInvitesResponse,
  LoadSentInvitesResponse,
} from '../responses/invite.response';
import { InvitesTypeDef } from '../schemas/invite.schema';

@Resolver(() => InvitesTypeDef)
export class InviteResolver {
  constructor(
    private readonly inviteService: InviteService,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}

  @Query(() => LoadReceivedInvitesResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadMyInvites(@CurrentAccount() user: AuthPayload) {
    return this.inviteService.loadMyInvites(user.account.id);
  }
  @Query(() => LoadSentInvitesResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadSentInvites(@CurrentAccount() user: AuthPayload) {
    return this.inviteService.loadSentInvites(user.account.id);
  }

  @Query(() => LoadGroupInvitesResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadSentGroupInvites(@CurrentAccount() user: AuthPayload) {
    return this.inviteService.loadSentGroupInvites(user.account.id);
  }

  @Query(() => LoadGroupInvitesResponse)
  @UseGuards(GraphqlAuthGuard)
  async loadReceivedGroupInvites(@CurrentAccount() user: AuthPayload) {
    return this.inviteService.loadReceivedGroupInvites(user.account.id);
  }

  @Mutation(() => CreateInvitesResponse)
  @UseGuards(GraphqlAuthGuard)
  async sendInvitesToNewGroup(
    @Args('sendInvitesInput') sendInvitesInput: SendInvitesToNewGroupInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    return this.inviteService.sendInvitesToNewGroup({
      input: sendInvitesInput,
      user,
    });
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

  @Mutation(() => DeleteSentInviteResponse)
  @UseGuards(GraphqlAuthGuard)
  async deleteSentInvite(
    @Args('input')
    input: DeleteSentInviteInput,
    @CurrentAccount() user: AuthPayload,
  ) {
    const inputObj = {
      ...input,
      user,
    };
    return this.inviteService.deleteSentInvite(inputObj);
  }
}
