import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { CreateAHistoryObjDTO } from 'src/graphql/dto/history.dto';
import { History, HistoryDocument } from 'src/mongo-schemas/history.model';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}
  async create(input: CreateAHistoryObjDTO): Promise<History> {
    try {
      const {
        paymentAmount,
        paymentMethod,
        contributor,
        date,
        currentBudgetAmount,
        occasionRef,
      } = input;

      if (!contributor) throw new Error('A contributor is required');
      if (!paymentAmount) throw new Error('A Payment amount is required');

      const newHistoryObj: History = {
        date: null,
        contributor,
        paymentAmount,
        paymentMethod,
        currentBudgetAmount,
        occasionRef,
      };
      const today = new Date();

      if (date) newHistoryObj.date = date;
      if (!date) newHistoryObj.date = today;

      const history = new this.historyModel(newHistoryObj);

      await history.save();

      return history;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
