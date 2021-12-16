import { Field, InputType } from '@nestjs/graphql';
import { ProfileInput } from './profile.input';

@InputType()
export class CreateAccountInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  passwordConfirm: string;
  @Field((type) => ProfileInput)
  profile: ProfileInput;
}
