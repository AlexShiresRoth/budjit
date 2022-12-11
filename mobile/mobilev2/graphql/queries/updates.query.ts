import { gql } from '@apollo/client';

export const FETCH_UPDATE = gql`
  query fetchUpdate($input: FetchUpdateInput!) {
    fetchUpdate(input: $input) {
      message
      success
      update {
        userRef
        updateTime
        updateDetails
        groupRef
        occasionRef
      }
    }
  }
`;
