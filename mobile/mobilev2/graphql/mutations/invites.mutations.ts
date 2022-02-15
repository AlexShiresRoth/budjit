import { gql } from '@apollo/client';

export const SEND_INVITES_TO_NEW_GROUP = gql`
  mutation sendInvites($sendInvitesInput: SendInvitesToNewGroupInput!) {
    sendInvitesToNewGroup(sendInvitesInput: $sendInvitesInput) {
      message
      success
      invites {
        sender {
          name
        }
        receiver
        groupRef {
          name
          creator {
            name
          }
          invites {
            inviteDate
            receiver
          }
        }
        inviteDate
      }
    }
  }
`;
