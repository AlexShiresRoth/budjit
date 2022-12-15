import { Field, InputType } from '@nestjs/graphql';
import { Group } from 'src/mongo-schemas/group.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { GroupTypeDef } from '../schemas/group.schema';
import { OccasionTypeDef } from '../schemas/occasion.schema';

@InputType()
export class CreateUpdateInput {
  @Field()
  updateDetails: string;
  @Field(() => GroupTypeDef, { nullable: true })
  groupRef?: Group;
  @Field(() => OccasionTypeDef, { nullable: true })
  occasionRef?: Occasion;
  @Field()
  userRef: string;
}

@InputType()
export class FetchUpdateInput {
  @Field()
  updateId: string;
}
