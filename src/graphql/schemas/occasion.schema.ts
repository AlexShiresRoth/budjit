import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { GroupTypeDef } from './group.schema';

@ObjectType()
export class OcassionTypeDef {
  @Field()
  title: string;
  @Field()
  budget: string;
  @Prop(() => GroupTypeDef)
  group: GroupTypeDef[];
}
