import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExternalInviteInput } from 'src/graphql/inputs/externalInvite.input';
import { CreateExternalInviteResponse } from 'src/graphql/responses/externalInvite.response';
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

      //an external invite is created when a user is invited to a group via phone or email
      const newExternalInvite = await this.externalInviteModel.create(
        externalInvite,
      );

      return {
        message: 'External Invite Created',
        success: true,
        externalInviteId: newExternalInvite._id.toString(),
      };
    } catch (error) {
      console.error(error);

      return {
        message: error?.message ?? "Couldn't create external invite",
        success: false,
        externalInviteId: null,
      };
    }
  }
}
