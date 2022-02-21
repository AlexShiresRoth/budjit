import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/mongo-schemas/group.model';
import { GroupTypeDef } from '../schemas/group.schema';

@ObjectType()
export class CreateGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => Group)
  Group: Group;
}

@ObjectType()
export class LoadGroupResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => GroupTypeDef)
  Group: Group;
}
