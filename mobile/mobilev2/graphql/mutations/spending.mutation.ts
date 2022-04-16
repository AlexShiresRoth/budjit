import { gql } from '@apollo/client';

export const SET_TIMEFRAME = gql`
  mutation setTime($input: SetTimeFrameInput!) {
    setTimeFrame(input: $input) {
      message
      success
      startDate
      endDate
    }
  }
`;
