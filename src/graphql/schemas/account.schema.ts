import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ProfileTypeDef } from './profile.schema';

@ObjectType()
export class AccountTypeDef {
  @Field(() => String)
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field((type) => ProfileTypeDef)
  profile: ProfileTypeDef;
}
