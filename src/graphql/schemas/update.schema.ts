import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateTypeDef {
  @Field()
  _id: string;
  @Field()
  updateDetails: string;
  @Field({ nullable: true })
  groupRef: string;
  @Field()
  userRef: string;
  @Field()
  updateTime: string;
  @Field({ nullable: true })
  occasionRef: string;
}
