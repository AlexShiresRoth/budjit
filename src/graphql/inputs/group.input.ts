import { Field, InputType } from '@nestjs/graphql';
import { Invite } from 'src/mongo-schemas/Invite.model';

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
  name: string;
  @Field()
  id: string;
}

@InputType()
export class CreateGroupInput {
  @Field()
  groupName: string;
  @Field(() => [Contact], { nullable: true })
  contacts: Contact[];
  @Field(() => [Member], { nullable: true })
  members: Member[];
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
