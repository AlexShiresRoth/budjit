import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Account } from 'src/mongo-schemas/account.model';

@InputType()
export class Invite {
  @Field()
  receiver: string;
}

@InputType()
export class InviteInput {
  @Field()
  groupId: string;
  @Field()
  myAccount: Account;
  @Field(() => Invite)
  invites: Invite[];
}

@InputType()
export class UpdateInviteStatusInput {
  @Field()
  status: string;
  @Field(() => String)
  id: string;
}
