import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  CreateExternalInviteInput,
  FetchExternalInviteInput,
} from 'src/graphql/inputs/externalInvite.input';
import {
  CreateExternalInviteResponse,
  FetchExternalInviteResponse,
} from 'src/graphql/responses/externalInvite.response';
import {
  ExternalInvite,
  ExternalInviteDocument,
} from 'src/mongo-schemas/ExternalInvite';

@Injectable()
export class ExternalInviteService {
  constructor(
    @InjectModel(ExternalInvite.name)
    private readonly externalInviteModel: Model<ExternalInviteDocument>,
  ) {}

  async createExternalInvite(
    externalInvite: CreateExternalInviteInput,
  ): Promise<CreateExternalInviteResponse> {
    try {
      if (!externalInvite) throw new Error('Could not create external invite');

      const id = new mongoose.Types.ObjectId();

      const newInvite = {
        _id: id,
        ...externalInvite,
      };
      //an external invite is created when a user is invited to a group via phone or email
      const newExternalInvite = await this.externalInviteModel.create(
        newInvite,
      );

      await newExternalInvite.save();

      return {
        message: 'External Invite Created',
        success: true,
        externalInvite: newExternalInvite,
      };
    } catch (error) {
      console.error(error);

      return {
        message: error?.message ?? "Couldn't create external invite",
        success: false,
        externalInvite: null,
      };
    }
  }
  async fetchInvite(
    input: FetchExternalInviteInput,
  ): Promise<FetchExternalInviteResponse> {
    try {
      const { _id } = input;

      if (!_id) throw new Error('Could not fetch external invite');

      const externalInvite = await this.externalInviteModel.findById(_id);

      if (!externalInvite) throw new Error('Could not fetch external invite');

      console.log('ext inv', externalInvite);

      return {
        message: 'External Invite Fetched',
        success: true,
        externalInvite,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error?.message ?? "Couldn't fetch external invite",
        success: false,
        externalInvite: null,
      };
    }
  }
}
