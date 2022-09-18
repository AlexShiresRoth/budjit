import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
  mutation createGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      Group {
        backgroundImage
        name
        _id
        creationDate
        externalInvites {
          _id
        }
        creator {
          _id
        }
        invites {
          _id
        }
        members {
          _id
        }
      }
      message
      success
    }
  }
`;