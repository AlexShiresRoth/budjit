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
