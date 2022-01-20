import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/interfaces/account.interface';
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
