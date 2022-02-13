import { gql } from '@apollo/client';

export const LOAD_INVITES = gql`
  query loadMyInvites {
    loadMyInvites {
      sender
      receiver
      status
      inviteDate
      groupRef
    }
  }
`;
