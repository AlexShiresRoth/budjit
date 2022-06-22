import { gql } from '@apollo/client';

export const FETCH_MY_GROUPS = gql`
  query fetchMyGroups {
    fetchGroups {
      message
      success
      groups {
        _id
        name
        creationDate
        backgroundImage
        creator {
          _id
        }
        members {
          _id
        }
      }
    }
  }
`;
