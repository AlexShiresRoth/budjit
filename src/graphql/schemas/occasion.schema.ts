import { Field, ObjectType } from '@nestjs/graphql';
import { AccountTypeDef } from './account.schema';
import { GroupTypeDef } from './group.schema';
import { HistoryTypeDef } from './history.schema';

@ObjectType()
export class OccasionTypeDef {
  @Field()
  title: string;
  @Field()
  budget: string;
  @Field(() => GroupTypeDef)
  group: GroupTypeDef;
  @Field(() => [HistoryTypeDef])
  history: HistoryTypeDef[];
  @Field()
  creator: string;
}
