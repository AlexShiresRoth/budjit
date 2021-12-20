import { Field, ObjectType } from '@nestjs/graphql';
import { AccountTypeDef } from './account.schema';

@ObjectType()
export class GroupTypeDef {
  @Field()
  members: AccountTypeDef[];
  @Field()
  invites: string[];
}
