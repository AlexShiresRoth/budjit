import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';
import { Profile } from 'src/mongo-schemas/profile.model';
import { AccountTypeDef } from '../schemas/account.schema';
import { GroupTypeDef } from '../schemas/group.schema';
import { ProfileTypeDef } from '../schemas/profile.schema';

@ObjectType()
export class CreateGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => GroupTypeDef)
  Group: Group;
}

@ObjectType()
export class LoadGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => GroupTypeDef)
  Group: Group;
}

@ObjectType()
export class FetchGroupsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [GroupTypeDef], { nullable: true })
  groups: Group[];
}

@ObjectType()
export class AccountAndProfile {
  @Field(() => AccountTypeDef)
  account: Account;
  @Field(() => ProfileTypeDef)
  profile: Profile;
}

@ObjectType()
export class FetchGroupMemberAccountsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [AccountAndProfile])
  accounts: AccountAndProfile[];
}

@ObjectType()
export class DeleteGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class UpdateGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => GroupTypeDef)
  Group: Group;
}
