import { Field, InputType } from '@nestjs/graphql';
import { CountryCode } from 'plaid';
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
  phone: string;
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
  @Field(() => Group)
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

@InputType()
export class ExchangePublicTokenInput {
  @Field()
  publicToken: string;
  @Field({ nullable: true })
  userId: string;
  @Field()
  institutionName: string;
}

@InputType()
export class LoadPlaidAccountDataInput {
  @Field()
  accessToken: string;
}

@InputType()
export class GetPlaidInstitutionInput {
  @Field()
  institution_id: string;
  @Field(() => String)
  country_code: CountryCode;
}

@InputType()
export class GetPlaidTransactionsInput {
  @Field()
  accessToken: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
}
