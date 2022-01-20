import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from 'src/mongo-schemas/Invite.model';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { AccountsService } from './account.service';
import { UpdateInvite } from 'src/graphql/dto/invite.dto';
import { GroupService } from './group.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name)
    private readonly inviteModel: Model<InviteDocument>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}

  async create(input: InviteInterface): Promise<Invite> {
    try {
      const newInvite = new this.inviteModel(input);

      await newInvite.save();
      //save the new invite on account
      await this.accountService.addInvite({
        invite: newInvite,
        userID: newInvite.receiver._id,
      });

      return newInvite;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async findOneById(id: string): Promise<Invite> {
    try {
      const foundInvite = await this.inviteModel.findById(id);

      if (!foundInvite) throw new Error('Could not locate invite');

      return foundInvite;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async updateStatus(input: UpdateInvite): Promise<Invite> {
    try {
      const { id, status, userID } = input;

      const foundInvite = await this.inviteModel.findById(id);

      if (!foundInvite) throw new Error('Could not locate invite');

      const acceptableStatus: Array<string> = ['accept', 'decline'];

      if (!acceptableStatus.includes(status))
        throw new Error('Not acceptable status');

      foundInvite.status = status;

      await foundInvite.save();
      //if status is accept add the user to the members array on the group
      if (status === 'accept') {
        //pass to group service to finish adding members in group document
        await this.groupService.addMembers({
          groupID: foundInvite.groupRef,
          userID,
        });
      }

      return foundInvite;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async loadMyInvites(userID: string): Promise<Invite[]> {
    try {
      const myAccount = await this.accountService.findOneById(userID);

      if (!myAccount) throw new Error('could not load account');

      const foundInvites = await Promise.all(
        myAccount.invites.map(async (invite: { _id: string }) => {
          const foundInvite = await this.findOneById(invite._id);

          return foundInvite;
        }),
      );

      console.log('my invites', foundInvites);
      return foundInvites;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
