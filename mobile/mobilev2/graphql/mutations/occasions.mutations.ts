import { gql } from '@apollo/client';

export const CREATE_OCCASION = gql`
  mutation createOccasion($input: CreateOccasionInput!) {
    createOccasion(input: $input) {
      message
      success
      Occasion {
        title
        initialBudget
        occasionStartDate
        occasionCreationDate
        occasionEndDate
        externalInvites {
          _id
        }
        invites {
          _id
        }
      }
    }
  }
`;
