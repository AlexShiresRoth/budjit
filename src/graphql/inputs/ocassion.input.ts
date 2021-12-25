import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Invite {
  @Field()
  receiver: string;
}

@InputType()
export class GroupInput {
  @Field(() => [Invite])
  invites: Invite[];
}

@InputType()
export class CreateOccasionInput {
  @Field()
  title: string;
  @Field()
  budget: string;
  @Field(() => GroupInput)
  group: GroupInput;
}
