import { gql } from '@apollo/client';

export const LOAD_SENT_GROUP_INVITES = gql`
  query loadGroupInvites {
    loadSentGroupInvites {
      message
      success
      groupInvites {
        _id
        receiver
        status
        sender
        inviteType
        groupRef
      }
    }
  }
`;

export const LOAD_OCCASION_INVITES = gql`
  query loadOccasionInvites {
    loadOccasionInvites {
      message
      success
    }
  }
`;

export const FETCH_EXTERNAL_INVITE = gql`
  query fetchExternalInvite($input: FetchExternalInviteInput!) {
    fetchExternalInvite(input: $input) {
      message
      success
      externalInvite {
        inviteDate
        receiverName
        receiverPhone
        status
      }
    }
  }
`;
