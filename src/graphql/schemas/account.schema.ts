import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlaidAccountTypeDef {
  @Field()
  _id: string;
  @Field()
  accessToken: string;
  @Field()
  accountName: string;
}

@ObjectType()
export class AccountTypeDef {
  @Field(() => String)
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => String, { nullable: true })
  profile: string;
  @Field(() => [PlaidAccountTypeDef])
  plaidAccounts: PlaidAccountTypeDef[];
}
