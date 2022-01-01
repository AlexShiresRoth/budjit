import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvitesTypeDef {
  @Field(() => String)
  sender: string;
  @Field(() => String)
  receiver: string;
  @Field()
  status: string;
  @Field()
  inviteDate: Date;
  @Field(() => String)
  groupRef: string;
}
