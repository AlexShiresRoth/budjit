import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';
import { AccountTypeDef } from '../schemas/account.schema';
import { GroupTypeDef } from '../schemas/group.schema';

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
  @Field(() => [GroupTypeDef])
  groups: Group[];
}

@ObjectType()
export class FetchGroupMemberAccountsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [AccountTypeDef])
  accounts: Account[];
}
