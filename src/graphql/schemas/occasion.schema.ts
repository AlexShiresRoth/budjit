import { Field, ObjectType } from '@nestjs/graphql';
import { GroupTypeDef } from './group.schema';
import { HistoryTypeDef } from './history.schema';

@ObjectType()
export class OccasionTypeDef {
  @Field()
  _id: string;
  @Field()
  title: string;
  @Field()
  budget: string;
  @Field(() => GroupTypeDef, { nullable: true })
  group: GroupTypeDef;
  @Field(() => [HistoryTypeDef], { nullable: true })
  history: HistoryTypeDef[];
  @Field()
  creator: string;
  @Field()
  initialBudget: string;
}
