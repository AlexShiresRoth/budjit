import { gql } from '@apollo/client';

export const LOAD_MY_PROFILE = gql`
  query loadMyProfile {
    loadMyProfile {
      avatar
      name
    }
  }
`;

export const FIND_PROFILE_BY_EMAIL = gql`
  query findProfileByEmail($input: FindProfileByEmailInput!) {
    findProfileByEmail(input: $input) {
      message
      success
      defaultAvatar
      profile {
        name
        avatar
      }
    }
  }
`;
