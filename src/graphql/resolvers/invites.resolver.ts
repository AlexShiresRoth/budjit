import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount, GraphqlAuthGuard } from 'src/auth/auth.guard';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { AccountsService } from 'src/services/account.service';
import { InviteService } from 'src/services/invite.service';
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
}
