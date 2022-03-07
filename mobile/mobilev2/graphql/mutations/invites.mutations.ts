import { gql } from '@apollo/client';

export const SEND_INVITES_TO_NEW_GROUP = gql`
  mutation sendInvites($sendInvitesInput: SendInvitesToNewGroupInput!) {
    sendInvitesToNewGroup(sendInvitesInput: $sendInvitesInput) {
      message
      success
      sentInvites {
        inviteDate
        inviteType
        receiver
      }
    }
  }
`;

export const DELETE_SENT_INVITE = gql`
  mutation deleteInvite($input: DeleteSentInviteInput!) {
    deleteSentInvite(input: $input) {
      message
      success
      invites
    }
  }
`;
