import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';
import { AccountTypeDef } from './account.schema';
import { GroupTypeDef } from './group.schema';

@ObjectType()
export class InvitesTypeDef {
  @Field()
  _id: string;
  @Field(() => AccountTypeDef)
  sender: Account;
  @Field(() => String)
  receiver: string;
  @Field()
  status: string;
  @Field()
  inviteDate: Date;
  @Field(() => GroupTypeDef)
  groupRef: Group;
}
