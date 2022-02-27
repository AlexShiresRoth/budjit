import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/mongo-schemas/profile.model';
import { ProfileTypeDef } from '../schemas/profile.schema';

@ObjectType()
export class FindProfileByEmailResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => ProfileTypeDef, { nullable: true })
  profile: Profile;
  @Field()
  defaultAvatar: string;
}
