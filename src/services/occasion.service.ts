import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOccasionInput } from 'src/graphql/inputs/ocassion.input';
import { InviteType } from 'src/graphql/schemas/group.schema';
import { OccasionTypeDef } from 'src/graphql/schemas/occasion.schema';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { OccasionInterface } from 'src/interfaces/occasion.interface';
import { Occasion, OccasionDocument } from 'src/mongo-schemas/occasion.model';

@Injectable()
export class OccasionService {
  constructor(
    @InjectModel(Occasion.name)
    private readonly occasionModel: Model<OccasionDocument>,
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
    //finish building this out
    try {
      const {
        title,
        budget,
        group: { invites },
      } = input;

      if (!title) throw new Error('Please provide a title');
      if (!budget) throw new Error('Please set a budget');

      const newOccasion: OccasionInterface = {
        title,
        budget,
        group: {
          members: [],
          invites: [],
        },
        creator: user.account.id,
      };
      const today = new Date();

      const formatInvites = invites.map((invite) => {
        const newInvite: InviteType = {
          sender: user.account.id,
          receiver: invite.receiver,
          inviteDate: today,
        };
        return newInvite;
      });

      if (invites.length > 0) newOccasion.group.invites = formatInvites;

      const obj = new this.occasionModel({ ...newOccasion });

      await obj.save();

      return obj;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
