import { gql } from '@apollo/client';

export const LOAD_PLAID_ACCOUNTS = gql`
  query loadPlaidAccounts {
    loadPlaidAccounts {
      message
      success
      accounts {
        accessToken
        accountName
        _id
      }
    }
  }
`;

export const LOAD_PLAID_ACCOUNT_DATA = gql`
  query loadPlaidData($input: LoadPlaidAccountDataInput!) {
    loadPlaidData(input: $input) {
      message
      success
      accounts {
        type
        subtype
        name
        official_name
        balances {
          available
          current
          iso_currency_code
          limit
        }
      }
      item {
        institution_id
      }
    }
  }
`;

export const GET_PLAID_INSTITUTION = gql`
  query getPlaidInstitution($input: GetPlaidInstitutionInput!) {
    getPlaidInstitution(input: $input) {
      message
      success
      logo
    }
  }
`;
