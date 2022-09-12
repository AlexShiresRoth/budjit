import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/mongo-schemas/group.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { GroupTypeDef } from './group.schema';
import { OccasionTypeDef } from './occasion.schema';

@ObjectType()
export class ExternalInviteTypeDef {
  @Field()
  _id: string;
  @Field()
  inviteDate: string;
  @Field()
  receiverName: string;
  @Field()
  receiverPhone: string;
  @Field()
  status: string;
  @Field(() => GroupTypeDef, { nullable: true })
  groupRef: Group;
  @Field(() => OccasionTypeDef, { nullable: true })
  occasionRef: Occasion;
  @Field()
  inviteType: 'group' | 'occasion';
}
