import { Field, InputType } from '@nestjs/graphql';
import { Invite } from './invite.input';

@InputType()
export class AddMembersInput {
  @Field(() => [Invite])
  invites: Invite[];
  @Field()
  occasionID: string;
}

@InputType()
export class CreateOccasionInput {
  @Field()
  title: string;
  @Field()
  budget: string;
}
