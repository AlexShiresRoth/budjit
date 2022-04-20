import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field()
  title: string;
  @Field()
  category: string;
  @Field()
  total: number;
  @Field()
  date: Date;
  @Field({ nullable: true })
  accountType: string;
}
