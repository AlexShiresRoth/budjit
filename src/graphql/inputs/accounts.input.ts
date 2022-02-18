import { Field, InputType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { AccountTypeDef } from '../schemas/account.schema';
import { InvitesTypeDef } from '../schemas/invite.schema';

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
  @Field(() => InvitesTypeDef)
  invite: Invite;
  @Field()
  receiver: string;
  @Field(() => AccountTypeDef)
  sender: Account;
}
