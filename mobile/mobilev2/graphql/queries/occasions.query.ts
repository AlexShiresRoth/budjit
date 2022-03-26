import { gql } from '@apollo/client';

export const LOAD_MY_OCCASIONS = gql`
  query loadOccasions {
    loadMyOccasions {
      message
      success
      Occasions {
        initialBudget
        creator
        title
      }
    }
  }
`;
