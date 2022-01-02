import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from 'src/mongo-schemas/history.model';
import { HistoryService } from 'src/services/history.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  providers: [History, HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
