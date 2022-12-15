import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Occasion } from 'src/mongo-schemas/occasion.model';

@InputType()
export class CreateTransactionInput {
  @Field()
  name: string;
  @Field()
  category: string;
  @Field()
  amount: number;
  @Field()
  date: string;
  @Field({ nullable: true })
  accountType: string;
  @Field(() => String)
  location: string;
  @Field(() => String, { nullable: true })
  occasionRef: Occasion;
}

@InputType()
export class EditTransactionInput extends CreateTransactionInput {
  @Field(() => String)
  _id: Types.ObjectId;
}

@InputType()
export class DeleteTransactionInput {
  @Field()
  _id: string;
}
