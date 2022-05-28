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

export const CREATE_TRANSACTION = gql`
  mutation createManualTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      message
      success
      Transaction {
        amount
        date
        accountType
        category
        title
        location
      }
    }
  }
`;
