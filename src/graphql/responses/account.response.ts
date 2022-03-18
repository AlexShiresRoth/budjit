import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { AccountTypeDef, PlaidAccountTypeDef } from '../schemas/account.schema';
import { InvitesTypeDef } from '../schemas/invite.schema';
import { AccountBase } from 'plaid';

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
export class LoadPlaidAccountsResponse {
  @Field(() => [PlaidAccountTypeDef])
  accounts: PlaidAccountTypeDef[];
  @Field()
  message: string;
  @Field()
  success: boolean;
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

@ObjectType()
export class DeleteInviteFromAccountResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => Account)
  Account: Account;
}

@ObjectType()
export class RetrievePlaidAuthTokenResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  token: string;
}

@ObjectType()
export class RetrievePlaidPublicTokenResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => AccountTypeDef)
  account: Account;
}

@ObjectType()
export class PlaidItem {
  @Field()
  institution_id: string;
}

@ObjectType()
export class LoadPlaidAccountDataResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [PlaidAccountConnection])
  accounts: AccountBase[];
  @Field(() => PlaidItem)
  item: PlaidItem;
}

@ObjectType()
export class AccountBalance {
  @Field({ nullable: true })
  available: number;
  @Field({ nullable: true })
  current: number;
  @Field({ nullable: true })
  iso_currency_code: string;
  @Field({ nullable: true })
  limit: number;
  @Field({ nullable: true })
  unofficial_currency_code: string;
}

@ObjectType()
export class PlaidAccountConnection {
  @Field({ nullable: true })
  account_id: string;
  @Field(() => AccountBalance, { nullable: true })
  balances: AccountBalance;
  @Field({ nullable: true })
  mask: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  official_name: string;
  @Field({ nullable: true })
  subtype: string;
  @Field({ nullable: true })
  type: string;
  @Field(() => PlaidItem)
  item: PlaidItem;
}

@ObjectType()
export class GetPlaidInstitutionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  logo: string;
}

@ObjectType()
export class GetPlaidTransactionsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  spending: number;
  @Field()
  id: string;
}
