import { gql } from '@apollo/client';

export const LOAD_INVITES = gql`
  query loadMyInvitess {
    loadMyInvites {
      sender {
        name
        profile
        password
        _id
      }
      status
      groupRef {
        name
        creator {
          name
          _id
        }
      }
      receiver
    }
  }
`;
