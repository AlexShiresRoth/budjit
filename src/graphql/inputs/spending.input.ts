import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SetTimeFrameInput {
  @Field()
  filter: 'Year' | 'Month' | 'Week';
}
