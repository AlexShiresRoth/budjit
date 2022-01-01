import { Field, ObjectType } from '@nestjs/graphql';
import { AccountTypeDef } from '../schemas/account.schema';
import { InvitesTypeDef } from '../schemas/invite.schema';

@ObjectType()
export class CreateAccountResponse {
  @Field()
  Account: AccountTypeDef;
  @Field()
  token: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  Account: AccountTypeDef;
  @Field()
  token: string;
}

@ObjectType()
export class LoadInviteResponse {
  @Field(() => InvitesTypeDef)
  Invites: InvitesTypeDef[];
}
