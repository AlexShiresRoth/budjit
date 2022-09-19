import { gql } from '@apollo/client';

export const LOAD_GROUP = gql`
  query loadGroup($input: LoadGroupInput!) {
    loadGroup(input: $input) {
      message
      success
      Group {
        name
        backgroundImage
        _id
      }
    }
  }
`;

export const FETCH_GROUP_MEMBERS = gql`
  query fetchGroupMembers($input: FetchGroupMembersInput!) {
    fetchGroupMembers(input: $input) {
      message
      success
      accounts {
        account {
          name
          _id
          profile
        }
        profile {
          avatar
        }
      }
    }
  }
`;
