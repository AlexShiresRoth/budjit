import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileInput {
  @Field()
  name: string;
  @Field()
  phone: string;
  @Field()
  avatar: string;
}
