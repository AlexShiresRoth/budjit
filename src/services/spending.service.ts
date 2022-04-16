import { Injectable } from '@nestjs/common';
import { SetTimeFrameInput } from 'src/graphql/inputs/spending.input';
import { SetTimeFrameResponse } from 'src/graphql/responses/spending.response';

@Injectable()
export class SpendingService {
  async setTimeFrame(input: SetTimeFrameInput): Promise<SetTimeFrameResponse> {
    const { filter } = input;

    let startDate: string;

    let endDate: string;
    //set spending timeframe for the current week
    const setWeekAsTimeFrame = () => {
      ///////////////////////////////
      const today = new Date();
      ///////////////////////////////
      const start =
        today.getDate() - (today.getDay() + (today.getDay() === 0 ? 7 : 1));

      ///////////////////////////////
      const tempDate = new Date();
      ///////////////////////////////
      const newStart = new Date(tempDate.setDate(start + 1));
      ///////////////////////////////
      startDate = newStart.toISOString().split('T')[0];
      ///////////////////////////////
      endDate = today.toISOString().split('T')[0];
    };

    const setMonthAsTimeFrame = () => {
      ///////////////////////////////
      const date = new Date();
      ///////////////////////////////
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      ///////////////////////////////
      startDate = firstDayOfMonth.toISOString().split('T')[0];
      ///////////////////////////////
      endDate = date.toISOString().split('T')[0];
    };

    const setYearAsTimeFrame = () => {
      ///////////////////////////////
      const date = new Date();
      ///////////////////////////////
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      ///////////////////////////////
      startDate = firstDayOfYear.toISOString().split('T')[0];
      ///////////////////////////////
      endDate = date.toISOString().split('T')[0];
    };

    switch (filter) {
      case 'Month':
        setMonthAsTimeFrame();
        break;
      case 'Week':
        setWeekAsTimeFrame();
        break;
      case 'Year':
        setYearAsTimeFrame();
        break;
      default:
        setWeekAsTimeFrame();
    }

    return {
      startDate,
      endDate,
      success: true,
      message: 'Successfully set a timeframe',
    };
  }
}
