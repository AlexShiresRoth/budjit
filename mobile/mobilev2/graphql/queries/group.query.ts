import { gql } from '@apollo/client';

export const LOAD_GROUP = gql`
  query loadGroup($input: LoadGroupInput!) {
    loadGroup(input: $input) {
      message
      success
      Group {
        name
        creator
      }
    }
  }
`;
