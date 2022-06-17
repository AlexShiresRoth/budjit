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
        _id
        amount
        date
        accountType
        category
        name
        location
        account_id
      }
    }
  }
`;

export const EDIT_TRANSACTION = gql`
  mutation createManualTransaction($input: EditTransactionInput!) {
    editTransaction(input: $input) {
      message
      success
      Transaction {
        _id
        amount
        date
        accountType
        category
        name
        location
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($input: DeleteTransactionInput!) {
    deleteTransaction(input: $input) {
      message
      success
    }
  }
`;
