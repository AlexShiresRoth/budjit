import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { AccountTypeDef } from '../schemas/account.schema';
import { InvitesTypeDef } from '../schemas/invite.schema';

@ObjectType()
export class CreateAccountResponse {
  @Field(() => AccountTypeDef)
  Account: Account;
  @Field()
  token: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => AccountTypeDef)
  Account: Account;
  @Field()
  token: string;
}

@ObjectType()
export class LoadInviteResponse {
  @Field(() => InvitesTypeDef)
  Invites: InvitesTypeDef[];
}

@ObjectType()
export class AddGroupToAccountResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => Account)
  account: Account;
}

@ObjectType()
export class AddInviteToAccountResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => Account)
  Account: Account;
}
