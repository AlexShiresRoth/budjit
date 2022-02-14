import { Field, InputType } from '@nestjs/graphql';
import { Group } from 'src/mongo-schemas/group.model';
import { Invite } from 'src/mongo-schemas/Invite.model';

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
}

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class AddGroupRefToAccountInput {
  @Field(() => String)
  groupId: Group;
  @Field()
  userID: string;
}

@InputType()
export class AddInviteToAccountInput {
  @Field(() => Invite)
  invite: Invite;
  @Field()
  receiver: string;
}
