import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from 'plaid';
import { Account } from 'src/mongo-schemas/account.model';
import { Invite } from 'src/mongo-schemas/Invite.model';
import { AccountTypeDef } from '../schemas/account.schema';

@InputType()
export class AddInviteToGroupInput {
  @Field()
  groupId: string;
  @Field(() => Invite)
  invite: Invite;
}

@InputType()
export class Contact {
  @Field()
  name: string;
  @Field()
  phone: string;
}

@InputType()
export class Member {
  @Field()
  _id: string;
}

@InputType()
export class CreateGroupInput {
  @Field()
  groupName: string;
  @Field(() => [Contact], { nullable: true })
  contacts: Contact[];
  @Field(() => [String], { nullable: true })
  members: Account[];
  @Field({ nullable: true })
  creator: string;
}

@InputType()
export class LoadGroupInput {
  @Field()
  groupID: string;
}

@InputType()
export class FetchGroupMembersInput {
  @Field()
  groupID: string;
}

@InputType()
export class DeleteGroupInput {
  @Field()
  groupID: string;
  @Field({ nullable: true })
  creatorID: string;
}

@InputType()
export class UpdateGroupInput {
  @Field()
  groupID: string;
  @Field({ nullable: true })
  groupName: string;
  @Field({ nullable: true })
  image: string;
}
