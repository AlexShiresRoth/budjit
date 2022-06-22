import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOccasionRef } from 'src/interfaces/group.interface';
import { Group, GroupDocument } from 'src/mongo-schemas/group.model';
import { AccountsService } from './account.service';
import { InviteService } from './invite.service';
import * as mongoose from 'mongoose';
import { AddMembersDTO } from 'src/graphql/dto/group.dto';
import {
  AddInviteToGroupInput,
  CreateGroupInput,
  FetchGroupMembersInput,
} from 'src/graphql/inputs/group.input';
import {
  CreateGroupResponse,
  FetchGroupMemberAccountsResponse,
  FetchGroupsResponse,
  LoadGroupResponse,
} from 'src/graphql/responses/group.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { GroupTypeDef } from 'src/graphql/schemas/group.schema';
import { AccountTypeDef } from 'src/graphql/schemas/account.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => InviteService))
    private readonly inviteService: InviteService,
  ) {}

  async fetchMyGroups(user: AuthPayload): Promise<FetchGroupsResponse> {
    try {
      const myAccount = await this.accountService.findOneById(user.account.id);

      if (!myAccount) throw new Error('Could not locate account');

      if (myAccount.groups.length === 0) throw new Error('No groups found');

      const myGroups = await Promise.all(
        myAccount.groups.map(async (group) => {
          return await this.groupModel.findById(group);
        }),
      );

      return {
        message: 'Found groups',
        success: true,
        groups: myGroups,
      };
    } catch (error) {
      return {
        message: error,
        success: false,
        groups: [],
      };
    }
  }

  async fetchGroupMembers(
    input: FetchGroupMembersInput,
  ): Promise<FetchGroupMemberAccountsResponse> {
    try {
      const foundGroup = await this.groupModel.findById(input.groupID);

      const members = await Promise.all(
        foundGroup.members.map(async ({ _id }) => {
          return await this.accountService.findOneById(_id);
        }),
      );

      return {
        success: true,
        message: 'Found group members',
        accounts: members ?? [],
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error,
        accounts: [],
      };
    }
  }

  async create(input: CreateGroupInput): Promise<CreateGroupResponse> {
    try {
      const { groupName, creator } = input;

      const foundAccount = await this.accountService.findOneById(creator);

      if (!foundAccount) throw new Error('Could not locate account');

      const id = new mongoose.Types.ObjectId();

      const newGroup = {
        members: [foundAccount],
        invites: [],
        _id: id,
        name: groupName,
        creator: foundAccount,
        creationDate: new Date(),
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
  ): Promise<LoadGroupResponse> {
    try {
      const foundGroup = await this.groupModel.findById(id);

      console.log('found group', foundGroup);

      if (!foundGroup) throw new Error('Could not locate a group');

      return {
        message: 'Found a group',
        success: true,
        Group: foundGroup,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: false,
        Group: null,
      };
    }
  }

  async addOccasionRef(input: AddOccasionRef): Promise<{}> {
    try {
      const { occasionRefId, groupID } = input;

      const foundGroup = await this.groupModel.findById(groupID);

      // foundGroup.occasionRef = occasionRefId;

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
