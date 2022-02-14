import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteInput } from 'src/graphql/inputs/invite.input';
import { AddOccasionRef } from 'src/interfaces/group.interface';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { Group, GroupDocument } from 'src/mongo-schemas/group.model';
import { AccountsService } from './account.service';
import { InviteService } from './invite.service';
import * as mongoose from 'mongoose';
import { AddMembersDTO } from 'src/graphql/dto/group.dto';
import {
  AddInviteToGroupInput,
  CreateGroupInput,
} from 'src/graphql/inputs/group.input';
import { CreateGroupResponse } from 'src/graphql/responses/group.response';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => InviteService))
    private readonly inviteService: InviteService,
  ) {}

  async create(input: CreateGroupInput): Promise<CreateGroupResponse> {
    try {
      const { creator, groupName } = input;

      const foundAccount = await this.accountService.findOneById(creator);

      if (!foundAccount) throw new Error('Could not locate account');

      const id = new mongoose.Types.ObjectId();

      const newGroup = {
        members: [foundAccount],
        invites: [],
        _id: id,
        name: groupName,
        creator: foundAccount,
      };

      const group = new this.groupModel(newGroup);

      await group.save();

      await this.accountService.addGroupRefToAccount({
        groupId: group._id,
        userID: creator,
      });

      return {
        message: 'Created a new group',
        success: true,
        Group: group,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOneById(
    id: string | mongoose.Schema.Types.ObjectId | Group,
  ): Promise<Group> {
    try {
      const foundGroup = await this.groupModel.findById(id);

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addOccasionRef(input: AddOccasionRef): Promise<Group> {
    try {
      const { occasionRefId, groupID } = input;

      const foundGroup = await this.groupModel.findById(groupID);

      foundGroup.occasionRef = occasionRefId;

      await foundGroup.save();

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addInviteToGroup(input: AddInviteToGroupInput) {
    try {
      const { groupId, invite } = input;

      const foundGroup = await this.groupModel.findById(groupId);

      if (!foundGroup) throw new Error('Could not locate a group');

      foundGroup.invites.push(invite);

      await foundGroup.save();

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addMembers(input: AddMembersDTO): Promise<Group> {
    try {
      const { groupID, userID } = input;

      const foundGroup = await this.groupModel.findById(groupID);

      if (!foundGroup) throw new NotFoundException('Could not locate group');

      const foundAccount = await this.accountService.findOneById(userID);

      if (!foundAccount)
        throw new NotFoundException('Could not locate account');

      foundGroup.members.push(foundAccount);
      //pass to account service to add group to account document
      await this.accountService.addGroupRefToAccount({
        groupId: foundGroup,
        userID: foundAccount._id,
      });

      await foundGroup.save();

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
