import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteInput } from 'src/graphql/inputs/invite.input';
import { AddOccasionRef, GroupInterface } from 'src/interfaces/group.interface';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { Group, GroupDocument } from 'src/mongo-schemas/group.model';
import { AccountsService } from './account.service';
import { InviteService } from './invite.service';
import * as mongoose from 'mongoose';
import { AddMembersDTO } from 'src/graphql/dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
    @Inject(forwardRef(() => InviteService))
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

  async sendInvites(input: InviteInput): Promise<Group> {
    try {
      const { invites, myAccount, groupId } = input;

      const foundGroup = await this.groupModel.findById(groupId);

      const today = new Date();

      console.log('my account', myAccount);

      const validInvites: InviteInterface[] = await Promise.all(
        invites.map(async (invite: { receiver: string }) => {
          const foundAccount = await this.accountService.findOneByEmail(
            invite.receiver,
          );

          if (!foundAccount) throw new Error('Could not locate an account');

          const invite_id = new mongoose.Types.ObjectId();

          const newInvite = await this.inviteService.create({
            sender: myAccount,
            receiver: foundAccount,
            inviteDate: today,
            status: 'pending',
            _id: invite_id,
            groupRef: foundGroup._id,
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
        groupID,
        userID: foundAccount,
      });

      await foundGroup.save();

      return foundGroup;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
