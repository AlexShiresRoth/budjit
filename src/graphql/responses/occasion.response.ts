import { Field, ObjectType } from '@nestjs/graphql';
import { Occasion } from 'src/mongo-schemas/occasion.model';
import { OccasionTypeDef } from '../schemas/occasion.schema';

@ObjectType()
export class CreateOccasionResponse {
  @Field(() => OccasionTypeDef)
  Occasion: Occasion;
  @Field()
  message: string;
  @Field()
  success: boolean;
}

@ObjectType()
export class LoadOccasionResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => OccasionTypeDef)
  Occasion: Occasion
}

@ObjectType()
export class LoadMyOccasionsResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => [OccasionTypeDef])
  Occasions: Occasion[];
}
