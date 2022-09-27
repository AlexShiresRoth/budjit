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
import { FindProfileByEmailInput } from 'src/graphql/inputs/profile.input';
import { FindProfileByEmailResponse } from 'src/graphql/responses/profile.response';

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

  async fetchProfile(id: string): Promise<Profile> {
    try {
      const foundProfile = await this.profileModel.findById(id);

      if (!foundProfile) throw new Error('Could not locate a profile');

      return foundProfile;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async findOneByEmail(
    input: FindProfileByEmailInput,
  ): Promise<FindProfileByEmailResponse> {
    try {
      const { email } = input;

      const foundAccount = await this.accountService.findOneByEmail(email);

      if (!foundAccount) {
        return {
          message: 'Could not locate an account with that email',
          success: false,
          profile: null,
          defaultAvatar:
            'https://res.cloudinary.com/snackmanproductions/image/upload/v1642559391/budjit-app/jeffgoldie.jpg',
        };
      }

      const foundProfile = await this.profileModel.findById(
        foundAccount.profile,
      );

      if (!foundProfile) throw new Error('Could not locate a profile');

      return {
        message: 'Located account',
        success: true,
        profile: foundProfile,
        defaultAvatar:
          'https://res.cloudinary.com/snackmanproductions/image/upload/v1642559391/budjit-app/jeffgoldie.jpg',
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: false,
        profile: null,
        defaultAvatar:
          'https://res.cloudinary.com/snackmanproductions/image/upload/v1642559391/budjit-app/jeffgoldie.jpg',
      };
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
      //have to upload to cloudinary via react atm
      if (avatar) {
        // const upload = await this.upploadImage(avatar);
        myProfile.avatar = avatar;
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
