import { Field, ObjectType } from '@nestjs/graphql';
import { OccasionTypeDef } from '../schemas/occasion.schema';

@ObjectType()
export class CreateOccasionResponse {
  @Field()
  Occasion: OccasionTypeDef;
}

@ObjectType()
export class LoadOccasionResponse {
  @Field()
  Occasion: OccasionTypeDef;
}
