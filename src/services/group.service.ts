import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteInput } from 'src/graphql/inputs/invite.input';
import { GroupInterface } from 'src/interfaces/group.interface';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { Group, GroupDocument } from 'src/mongo-schemas/group.model';
import { AccountsService } from './account.service';
import { InviteService } from './invite.service';
import * as mongoose from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    private readonly accountService: AccountsService,
    private readonly inviteService: InviteService,
  ) {}

  async create(creator: string): Promise<Group> {
    try {
      const foundAccount = await this.accountService.findOneById(creator);

      if (!foundAccount) throw new Error('Could not locate account');

      const id = new mongoose.Types.ObjectId();

      const newGroup: GroupInterface & { _id: typeof id } = {
        members: [foundAccount],
        invites: [],
        _id: id,
      };
      const group = new this.groupModel(newGroup);

      await group.save();

      return group;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sendInvites(input: InviteInput): Promise<Group> {
    try {
      const { invites, myAccount, groupId } = input;

      const foundGroup = await this.groupModel.findById(groupId);

      const today = new Date();

      const validInvites: InviteInterface[] = await Promise.all(
        invites.map(async (invite: { receiver: string }) => {
          const foundAccount = await this.accountService.findOneByEmail(
            invite.receiver,
          );

          if (!foundAccount) throw new Error('Could not locate an account');

          const newInvite = await this.inviteService.create({
            sender: myAccount,
            receiver: foundAccount,
            inviteDate: today,
          });

          return newInvite;
        }),
      );

      //push the invites to the group model
      validInvites.forEach((invite: InviteInterface) =>
        //this isn't pushing an object
        foundGroup.invites.push(invite),
      );

      await foundGroup.save();

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
