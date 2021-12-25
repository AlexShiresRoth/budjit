import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OccasionResolver } from 'src/graphql/resolvers/occasions.resolver';
import { Occasion, OccasionSchema } from 'src/mongo-schemas/occasion.model';
import { OccasionService } from 'src/services/occasion.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Occasion.name, schema: OccasionSchema },
    ]),
  ],
  providers: [OccasionService, OccasionResolver, Occasion],
  exports: [OccasionService],
})
export class OccasionModule {}
