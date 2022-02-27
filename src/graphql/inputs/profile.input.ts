import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileInput {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  avatar: string;
}

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  avatar: string;
  @Field()
  profileId: string;
}

@InputType()
export class FindProfileByEmailInput {
  @Field()
  email: string;
}
