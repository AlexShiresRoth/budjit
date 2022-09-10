import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateExternalInviteResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  externalInviteId: string;
}
