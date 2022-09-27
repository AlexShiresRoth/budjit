import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateResolver } from 'src/graphql/resolvers/updates.resolver';
import { Update, UpdateSchema } from 'src/mongo-schemas/update.model';
import { UpdateService } from 'src/services/update.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Update.name, schema: UpdateSchema }]),
  ],
  providers: [Update, UpdateService, UpdateResolver],
  exports: [UpdateService],
})
export class UpdateModule {}
