import { Field, ObjectType, ID } from '@nestjs/graphql';
import { DateScalar } from '../scalars/date.scalar';
import { AccountTypeDef } from './account.schema';

@ObjectType()
export class GroupTypeDef {
  @Field(() => [AccountTypeDef])
  members: AccountTypeDef[];
  @Field(() => [InviteType])
  invites: InviteType[];
}

@ObjectType()
export class InviteType {
  @Field()
  inviteDate: Date;
  @Field()
  sender: string;
  @Field()
  receiver: string;
}
