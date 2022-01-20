import { gql } from '@apollo/client';

export const LOAD_MY_PROFILE = gql`
  query loadMyProfile {
    loadMyProfile {
      avatar
      name
    }
  }
`;
