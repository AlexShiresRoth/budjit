import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation login($loginInput: LoginInput!) {
    authenticate(loginInput: $loginInput) {
      Account {
        email
        name
        profile
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
      Account {
        name
        email
        profile
      }
      token
    }
  }
`;

export const RETRIEVE_PLAID_TOKEN = gql`
  mutation retrievePlaidToken {
    retrievePlaidAuthToken {
      message
      success
      token
    }
  }
`;

export const EXCHANGE_PLAID_PUBLIC_TOKEN = gql`
  mutation exchangePublicToken($input: ExchangePublicTokenInput!) {
    publicTokenExchange(input: $input) {
      message
      success
      account {
        name
        email
        plaidAccounts {
          _id
          accessToken
          accountName
        }
      }
    }
  }
`;

export const GET_PLAID_TRANSACTIONS_BY_TIMEFRAME = gql`
  mutation getPlaidTransactions($input: GetPlaidTransactionsInput!) {
    getPlaidTransactions(input: $input) {
      message
      success
      spending
      id
      startDate
      endDate
      transactions {
        name
        date
        amount
        transaction_id
      }
    }
  }
`;
