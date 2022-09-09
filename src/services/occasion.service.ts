import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddMembersInput,
  ContributeToBudgetInput,
  CreateOccasionInput,
} from 'src/graphql/inputs/ocassion.input';
import { LoadMyOccasionsResponse } from 'src/graphql/responses/occasion.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { OccasionInterface } from 'src/interfaces/occasion.interface';
import { Occasion, OccasionDocument } from 'src/mongo-schemas/occasion.model';
import { AccountsService } from './account.service';
import { GroupService } from './group.service';
import { HistoryService } from './history.service';

//TODO accept invite strategy
@Injectable()
export class OccasionService {
  constructor(
    @InjectModel(Occasion.name)
    private readonly occasionModel: Model<OccasionDocument>,
    private readonly groupService: GroupService,
    private readonly accountService: AccountsService,
    private readonly historyService: HistoryService,
  ) {}

  async findOneById(id: string): Promise<Occasion> {
    if (!id) throw new Error('Could not locate document');

    const foundOccasion = await this.occasionModel.findById(id);

    if (!foundOccasion) throw new Error('Could not locate occasion');

    return foundOccasion;
  }

  async findAll(userId: string): Promise<LoadMyOccasionsResponse> {
    try {
      const myAccount = await this.accountService.findOneById(userId);

      if (!myAccount)
        throw new Error('Hmmm something went wrong locating your account');

      return {
        message: 'Found your occasions',
        success: true,
        Occasions: myAccount.occasions,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // async create(
  //   input: CreateOccasionInput,
  //   user: AuthPayload,
  // ): Promise<Occasion> {
  //   try {
  //     const { title, budget, occasionStartDate } = input;

  //     if (!title) throw new Error('Please provide a title');
  //     if (!budget) throw new Error('Please set a budget');

  //     const group = await this.groupService.create({
  //       creator: user.account.id,
  //       groupName: title,
  //     });

  //     const myAccount = await this.accountService.findOneById(user.account.id);

  //     const manipulateBudgetString = (str: string) => {
  //       const split = str.split('');

  //       if (split.includes('.')) return budget;

  //       return str + '.00';
  //     };

  //     //force a decimal point if user removes it
  //     const assessedBudget = manipulateBudgetString(budget);

  //     //validate a date string;

  //     const validDate = (occasionStartDate: string) => {
  //       const date = new Date(occasionStartDate);

  //       return date ?? false;
  //     };

  //     if (!validDate) throw new Error('Date somehow formatted incorrectly');

  //     const newOccasion: OccasionInterface = {
  //       title,
  //       budget: assessedBudget,
  //       creator: user.account.id,
  //       group: group.Group,
  //       invites: [],
  //       initialBudget: assessedBudget,
  //       occasionStartDate,
  //     };

  //     const obj = new this.occasionModel({ ...newOccasion });

  //     await obj.save();
  //     //add occasions to my account
  //     await this.accountService.addOccasion({
  //       occasion: obj,
  //       userID: myAccount._id,
  //     });
  //     //add group to my account
  //     // await this.accountService.addGroupRefToAccount({
  //     //   groupID: group,
  //     //   userID: myAccount,
  //     // });
  //     // //add the occasion reference to the created group doc
  //     // await this.groupService.addOccasionRef({
  //     //   occasionRefId: obj._id,
  //     //   groupID: group._id,
  //     // });

  //     return obj;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(error);
  //   }
  // }

  async contributeToBudget(
    input: ContributeToBudgetInput,
    user: AuthPayload,
  ): Promise<Occasion> {
    try {
      const { occasionID, paymentAmount, date, paymentMethod } = input;
      //date is malleable
      const foundOccasion = await this.occasionModel.findById(occasionID);

      const myAccount = await this.accountService.findOneById(user.account.id);

      //dont allow for excess payment
      if (parseFloat(foundOccasion.budget) < parseFloat(paymentAmount))
        throw new Error('Payment amount cannot be more than budget');

      //handle calc via numbers obvi, must return a string
      const getNewTotal = (total: string, contribution: string): string => {
        const diff = Math.abs(
          parseFloat(total) - parseFloat(contribution),
        ).toFixed(2);

        return String(diff);
      };

      const newBudget = getNewTotal(foundOccasion.budget, paymentAmount);

      const historyObj = await this.historyService.create({
        paymentAmount,
        date,
        currentBudgetAmount: newBudget,
        contributor: myAccount,
        paymentMethod,
        occasionRef: foundOccasion,
      });

      //change budget accordingly based upon new contributution
      foundOccasion.budget = newBudget;
      //add new history object to occasion doc
      foundOccasion.history.push(historyObj);

      await foundOccasion.save();

      return foundOccasion;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
