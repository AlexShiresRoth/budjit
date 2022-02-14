import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from 'src/mongo-schemas/Invite.model';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { AccountsService } from './account.service';
import { UpdateInvite } from 'src/graphql/dto/invite.dto';
import { GroupService } from './group.service';
import {
  CreateInviteInput,
  SendInvitesToNewGroupInput,
} from 'src/graphql/inputs/invite.input';
import {
  CreateInviteResponse,
  CreateInvitesResponse,
} from 'src/graphql/responses/invite.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import * as mongoose from 'mongoose';

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

  async create(input: CreateInviteInput): Promise<CreateInviteResponse> {
    try {
      const id = new mongoose.Types.ObjectId();

      const newInvite = new this.inviteModel({ ...input, _id: id });
      //save the new invite on account
      await newInvite.save();

      //save the invite into account
      await this.accountService.addInvite({
        invite: newInvite,
        receiver: newInvite.receiver,
      });

      return {
        message: 'Created a new invite',
        success: true,
        invite: newInvite,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //TODO add invites to account under SENT
  async sendInvitesToNewGroup(input: {
    input: SendInvitesToNewGroupInput;
    user: AuthPayload;
  }): Promise<CreateInvitesResponse> {
    try {
      const {
        input: { groupName, invites },
        user,
      } = input;

      const myAccount = await this.accountService.findOneById(user.account.id);

      const currentDate = new Date();

      const newGroup = await this.groupService.create({
        groupName,
        creator: user.account.id,
      });

      //create all new invites
      const newInvites = await Promise.all(
        invites.map(async (invite) => {
          const newInvite = await this.create({
            sender: myAccount,
            receiver: invite,
            status: 'pending',
            groupRef: newGroup.Group,
            inviteDate: currentDate,
          });

          await this.groupService.addInviteToGroup({
            groupId: newGroup.Group._id,
            invite: newInvite.invite,
          });

          return newInvite.invite;
        }),
      );

      return {
        message: 'Created new invites',
        success: true,
        invites: newInvites,
      };
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
