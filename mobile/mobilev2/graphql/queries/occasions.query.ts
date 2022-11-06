import { gql } from '@apollo/client';

export const LOAD_MY_OCCASIONS = gql`
  query loadOccasions {
    loadMyOccasions {
      message
      success
      Occasions {
        _id
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

export const LOAD_OCCASION = gql`
  query ($input: LoadOccasionInput!) {
    loadOccasion(input: $input) {
      message
      success
      Occasion {
        _id
        title
        initialBudget
        creator
        budget
        amountContributed
        occasionStartDate
        occasionCreationDate
        occasionEndDate
        externalInvites {
          _id
        }
        invites {
          _id
        }
        updates {
          _id
        }
      }
    }
  }
`;
