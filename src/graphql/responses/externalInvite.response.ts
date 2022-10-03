import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ExternalInvite } from 'src/mongo-schemas/ExternalInvite';
import { ExternalInviteTypeDef } from '../schemas/externalInvite.schema';

@ObjectType()
export class CreateExternalInviteResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => ExternalInviteTypeDef)
  externalInvite: ExternalInvite;
}

@ObjectType()
export class FetchExternalInviteResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => ExternalInviteTypeDef)
  externalInvite: ExternalInvite;
}
