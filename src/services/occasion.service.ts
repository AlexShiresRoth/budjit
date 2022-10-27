import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  AddMembersInput,
  ContributeToBudgetInput,
  CreateOccasionInput,
  LoadOccasionInput,
} from 'src/graphql/inputs/ocassion.input';
import {
  CreateOccasionResponse,
  LoadMyOccasionsResponse,
  LoadOccasionResponse,
} from 'src/graphql/responses/occasion.response';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { OccasionInterface } from 'src/interfaces/occasion.interface';
import { Occasion, OccasionDocument } from 'src/mongo-schemas/occasion.model';
import { AccountsService } from './account.service';
import { ExternalInviteService } from './externalInvite.service';
import { GroupService } from './group.service';
import { HistoryService } from './history.service';

@Injectable()
export class OccasionService {
  constructor(
    @InjectModel(Occasion.name)
    private readonly occasionModel: Model<OccasionDocument>,
    private readonly groupService: GroupService,
    private readonly accountService: AccountsService,
    private readonly historyService: HistoryService,
    private readonly externalInviteService: ExternalInviteService,
  ) {}

  async findOneById(input: LoadOccasionInput): Promise<LoadOccasionResponse> {
    const { occasionID } = input;
    try {
      if (!occasionID) throw new Error('Could not locate document');

      const foundOccasion = await this.occasionModel.findById(occasionID);

      if (!foundOccasion) throw new Error('Could not locate occasion');

      return {
        message: 'Found your occasion',
        success: true,
        Occasion: foundOccasion,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error.message,
        success: false,
        Occasion: null,
      };
    }
  }

  async findAll(userId: string): Promise<LoadMyOccasionsResponse> {
    try {
      const myAccount = await this.accountService.findOneById(userId);

      if (!myAccount)
        throw new Error('Hmmm something went wrong locating your account');

      //need to refetch occasions because only ids are provided from account
      const foundOccasions = await Promise.all(
        myAccount?.occasions.map(
          async (occasion) => await this.occasionModel.findById(occasion),
        ),
      );

      return {
        message: 'Found your occasions',
        success: true,
        Occasions: foundOccasions.filter((o) => o).reverse(),
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //@TODO: this will need to be refactored to handle new fields: see updated schema
  async create(
    input: CreateOccasionInput,
    user: AuthPayload,
  ): Promise<CreateOccasionResponse> {
    try {
      const {
        title,
        budget = '0.00',
        occasionStartDate,
        occasionEndDate,
        contacts,
        members,
      } = input;

      //creating an occasion only requires a title
      if (!title) throw new Error('Please provide a title');

      const myAccount = await this.accountService.findOneById(user.account.id);

      //Fix a non formatted budhet string
      const manipulateBudgetString = (str: string) =>
        str.split('').includes('.') ? budget : str + '.00';

      //force a decimal point if user removes it
      const assessedBudget = manipulateBudgetString(budget);

      //validate a date string or set to current date
      const validDate = (date: string) => new Date(date) ?? new Date();

      //generate an id before saving in order to forward it to the invite service
      const occasionId = new mongoose.Types.ObjectId();

      const newOccasion: OccasionInterface & { _id: typeof occasionId } = {
        title,
        budget: assessedBudget,
        creator: user.account.id,
        externalInvites: [],
        invites: [],
        members: [user.account.id],
        initialBudget: assessedBudget,
        //set to default date if no valid date is provided
        occasionStartDate: validDate(occasionStartDate)
          ? occasionStartDate
          : undefined,
        occasionEndDate: validDate(occasionEndDate)
          ? occasionEndDate
          : undefined,
        _id: occasionId,
      };

      //create external invites if a contact list exists
      if (Array.isArray(contacts) && contacts.length > 0) {
        //it should create an invite and a person can join by matching their phone
        const externalInvites = await Promise.all(
          //create all the external invites passed to the occasion
          contacts.map(async (contact) => {
            const externalInvite =
              await this.externalInviteService.createExternalInvite({
                occasionRef: occasionId.toString(),
                groupRef: null,
                receiverName: contact.name,
                receiverPhone: contact.phone,
                inviteType: 'occasion',
              });
            //only need the _id for reference
            return { _id: externalInvite.externalInvite._id };
          }),
        );
        //push the new external invites to the occasion
        externalInvites.forEach((invite) =>
          newOccasion.externalInvites.push(invite),
        );
      }

      //create internal invites for members if "invites" exist
      //TODO need to create internal invites
      if (Array.isArray(members) && members.length > 0) {
        const foundMembers = await Promise.all(
          members.map(async (member) => {
            const foundMember = await this.accountService.findOneById(
              member._id,
            );
            return foundMember;
          }),
        );
        //invites are the members who are invited to the occasion not from a contact list
        newOccasion.invites = [...newOccasion.invites, ...foundMembers];
      }

      const occasion = new this.occasionModel({ ...newOccasion });
      //save occasion
      await occasion.save();
      //add occasions to my account
      await this.accountService.addOccasion({
        occasion: occasion,
        userID: myAccount._id,
      });

      return {
        message: 'Occasion created',
        success: true,
        Occasion: occasion,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error.message,
        success: false,
        Occasion: null,
      };
    }
  }

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
  //@TODO: need to delete occasion for all members
}
