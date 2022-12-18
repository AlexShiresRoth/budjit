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
        amountContributed
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

export const BATCH_FETCH_OCCASION_TRANSACTIONS = gql`
  query fetchOccasionTransactions($input: FetchOccasionTransactionsInput!) {
    batchFetchOccasionTransactions(input: $input) {
      message
      success
      transactions {
        _id
        name
        amount
        date
        occasionRef {
          _id
        }
        personAccountRef {
          _id
        }
      }
    }
  }
`;
