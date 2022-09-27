import { Field, ObjectType } from '@nestjs/graphql';
import { Update } from 'src/mongo-schemas/update.model';
import { UpdateTypeDef } from '../schemas/update.schema';

@ObjectType()
export class CreateUpdateResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  update: Update;
}

@ObjectType()
export class FetchUpdateResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field(() => UpdateTypeDef)
  update: Update;
}
