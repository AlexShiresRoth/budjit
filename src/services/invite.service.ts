import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from 'src/mongo-schemas/Invite.model';
import { InviteInterface } from 'src/interfaces/invite.interface';
import { AccountsService } from './account.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name)
    private readonly inviteModel: Model<InviteDocument>,
    private readonly accountService: AccountsService,
  ) {}

  async create(input: InviteInterface): Promise<Invite> {
    try {
      const newInvite = new this.inviteModel(input);

      await newInvite.save();
      //save the new invite on account
      await this.accountService.addInvite({
        invite: newInvite,
        userID: newInvite.receiver._id,
      });

      return newInvite;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
