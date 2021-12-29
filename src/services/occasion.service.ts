import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddMembersInput,
  CreateOccasionInput,
} from 'src/graphql/inputs/ocassion.input';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { OccasionInterface } from 'src/interfaces/occasion.interface';
import { Occasion, OccasionDocument } from 'src/mongo-schemas/occasion.model';
import { AccountsService } from './account.service';
import { GroupService } from './group.service';

//TODO accept invite strategy
@Injectable()
export class OccasionService {
  constructor(
    @InjectModel(Occasion.name)
    private readonly occasionModel: Model<OccasionDocument>,
    private readonly groupService: GroupService,
    private readonly accountService: AccountsService,
  ) {}

  async findOneById(id: string): Promise<Occasion> {
    if (!id) throw new Error('Could not locate document');

    const foundOccasion = await this.occasionModel.findById(id);

    if (!foundOccasion) throw new Error('Could not locate occasion');

    return foundOccasion;
  }

  async create(
    input: CreateOccasionInput,
    user: AuthPayload,
  ): Promise<Occasion> {
    try {
      const { title, budget } = input;

      if (!title) throw new Error('Please provide a title');
      if (!budget) throw new Error('Please set a budget');

      const group = await this.groupService.create(user.account.id);

      const myAccount = await this.accountService.findOneById(user.account.id);

      const newOccasion: OccasionInterface = {
        title,
        budget,
        creator: user.account.id,
        group,
        invites: [],
      };

      const obj = new this.occasionModel({ ...newOccasion });

      await obj.save();
      //add occasions to my account
      await this.accountService.addOccasion({
        occasion: obj,
        userID: myAccount._id,
      });

      return obj;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async sendInvites(
    input: AddMembersInput,
    user: AuthPayload,
  ): Promise<Occasion> {
    try {
      const { occasionID, invites } = input;

      if (invites.length === 0) throw new Error('Please add recipients');

      const foundOccasion = await this.occasionModel.findById(occasionID);

      const myAccount = await this.accountService.findOneById(user.account.id);

      const group = await this.groupService.sendInvites({
        groupId: foundOccasion.group._id,
        myAccount,
        invites,
      });

      //update group object via groupservice
      foundOccasion.group = group;

      await foundOccasion.save();

      return foundOccasion;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
