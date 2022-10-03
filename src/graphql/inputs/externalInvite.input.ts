import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExternalInviteInput {
  @Field()
  receiverPhone: string;
  @Field()
  receiverName: string;
  @Field()
  inviteType: 'group' | 'occasion';
  @Field({ nullable: true })
  groupRef: string;
  @Field({ nullable: true })
  occasionRef: string;
}

@InputType()
export class FetchExternalInviteInput {
  @Field()
  _id: string;
}
