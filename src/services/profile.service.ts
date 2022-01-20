import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ProfileInterface,
  UpdateProfileInterface,
} from 'src/interfaces/profile.interface';
import {
  defaultAvatar,
  Profile,
  ProfileDocument,
} from 'src/mongo-schemas/profile.model';
import { AccountsService } from './account.service';
import * as cloudinary from 'cloudinary';
import { v4 } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountService: AccountsService,
  ) {}

  async findOneById(id: string): Promise<Profile> {
    try {
      const myAccount = await this.accountService.findOneById(id);

      if (!myAccount) throw new Error('Could not locate account');

      if (!myAccount.profile)
        throw new Error('Account does not have a profile');

      const myProfile = await this.profileModel.findById(myAccount.profile);

      if (!myProfile) throw new Error('Could not locate a profile');

      return myProfile;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async upploadImage(imgUrl: string): Promise<string> {
    try {
      const id = v4();

      const upload = await cloudinary.v2.uploader.upload(imgUrl, {
        public_id: 'budjit-app/' + id,
      });

      return upload.secure_url;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async configCloudinary(): Promise<void> {
    cloudinary.v2.config({
      cloud_name: process.env.CLD_CLOUD,
      api_secret: process.env.CLD_SECRET,
      api_key: process.env.CLD_KEY,
      secure: true,
    });
  }
  async create(input: ProfileInterface): Promise<Profile> {
    try {
      const { name, avatar, accountId } = input;

      await this.configCloudinary();

      const myAccount = await this.accountService.findOneById(accountId);

      const id = new Types.ObjectId();

      const profileFields: { name: string; avatar: string; _id: typeof id } = {
        name: '',
        avatar: defaultAvatar,
        _id: id,
      };

      if (name) profileFields.name = name;
      if (!name) profileFields.name = myAccount.name;
      if (avatar) {
        const uploaded: string = await this.upploadImage(avatar);
        profileFields.avatar = uploaded;
      }

      const newProfile = new this.profileModel(profileFields);

      await newProfile.save();

      console.log('profile>', newProfile);

      return newProfile;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async update(input: UpdateProfileInterface): Promise<Profile> {
    try {
      const { profileId, avatar, name } = input;

      const myProfile = await this.profileModel.findById(profileId);

      if (!myProfile) throw new Error('Something went horribly wrong');

      if (avatar) {
        const upload = await this.upploadImage(avatar);
        myProfile.avatar = upload;
      }
      if (name) myProfile.name = name;

      await myProfile.save();

      return myProfile;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
