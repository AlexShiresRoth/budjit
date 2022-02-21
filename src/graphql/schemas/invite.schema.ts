import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/mongo-schemas/account.model';
import { Group } from 'src/mongo-schemas/group.model';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { GroupTypeDef } from './group.schema';
import { OccasionTypeDef } from './occasion.schema';

@ObjectType()
export class InvitesTypeDef {
  @Field()
  _id: string;
  @Field(() => String)
  sender: Account;
  @Field(() => String)
  receiver: string;
  @Field()
  status: string;
  @Field()
  inviteDate: Date;
  @Field(() => String)
  groupRef: Group;
  @Field(() => OccasionTypeDef)
  occasionRef: Occasion;
  @Field(() => String)
  inviteType: 'group' | 'occasion';
}
