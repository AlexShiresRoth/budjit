import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileTypeDef {
  @Field()
  name: string;
  @Field()
  phone: string;
  @Field()
  avatar: string;
}
