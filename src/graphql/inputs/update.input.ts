import { Field, InputType } from '@nestjs/graphql';
import { Group } from 'src/mongo-schemas/group.model';
import { GroupTypeDef } from '../schemas/group.schema';

@InputType()
export class CreateUpdateInput {
  @Field()
  updateDetails: string;
  @Field(() => GroupTypeDef)
  groupRef: Group;
  @Field()
  userRef: string;
}

@InputType()
export class FetchUpdateInput {
  @Field()
  updateId: string;
}
