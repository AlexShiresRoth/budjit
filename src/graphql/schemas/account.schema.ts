import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProfileTypeDef } from './profile.schema';

@ObjectType()
export class AccountTypeDef {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field((type) => ProfileTypeDef)
  profile: ProfileTypeDef;
}
