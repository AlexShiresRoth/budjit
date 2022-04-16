import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SetTimeFrameResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
}
