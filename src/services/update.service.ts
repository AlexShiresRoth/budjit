import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUpdateInput,
  FetchUpdateInput,
} from 'src/graphql/inputs/update.input';
import {
  CreateUpdateResponse,
  FetchUpdateResponse,
} from 'src/graphql/responses/update.response';
import { Update } from 'src/mongo-schemas/update.model';

@Injectable()
export class UpdateService {
  constructor(
    @InjectModel(Update.name) private readonly UpdateModel: Model<Update>,
  ) {}
  async createUpdate(input: CreateUpdateInput): Promise<CreateUpdateResponse> {
    try {
      const newUpdate = await this.UpdateModel.create({
        ...input,
      });

      await newUpdate.save();

      return {
        message: 'Update created successfully',
        success: true,
        update: newUpdate,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        update: null,
      };
    }
  }

  async fetchUpdate(input: FetchUpdateInput): Promise<FetchUpdateResponse> {
    try {
      const update = await this.UpdateModel.findById(input.updateId);

      if (!update) throw new Error('Could not locate update');

      return {
        message: 'Update fetched successfully',
        success: true,
        update,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error.message,
        success: false,
        update: null,
      };
    }
  }
}
