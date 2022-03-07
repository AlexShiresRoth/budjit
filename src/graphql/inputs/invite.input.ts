import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';

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
export class SendInvitesToNewGroupInput {
  @Field()
  groupName: string;
  @Field(() => [String])
  invites: Array<string>;
}

@InputType()
export class CreateInviteInput {
  @Field(() => Account)
  sender: Account;
  @Field()
  receiver: string;
  @Field()
  status: string;
  @Field(() => Group)
  groupRef: Group;
  @Field(() => Date)
  inviteDate: Date;
  @Field(() => String)
  inviteType: 'group' | 'occasion';
}

@InputType()
export class UpdateInviteStatusInput {
  @Field()
  status: string;
  @Field(() => String)
  id: string;
}

@InputType()
export class DeleteSentInviteInput {
  @Field()
  invite_id: string;
  @Field()
  receiver_email: string;
}
