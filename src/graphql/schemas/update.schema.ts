import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTypeDef {
  @Field()
  _id: string;
  @Field()
  updateDetails: string;
  @Field()
  groupRef: string;
  @Field()
  userRef: string;
  @Field()
  updateTime: string;
}
