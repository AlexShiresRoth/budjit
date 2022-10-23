import { gql } from '@apollo/client';

export const LOAD_MY_OCCASIONS = gql`
  query loadOccasions {
    loadMyOccasions {
      message
      success
      Occasions {
        creator
        title
        occasionCreationDate
        occasionStartDate
        occasionEndDate
        budget
        initialBudget
        invites {
          _id
        }
        externalInvites {
          _id
        }
        updates {
          _id
        }
      }
    }
  }
`;
