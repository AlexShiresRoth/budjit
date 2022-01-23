import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation updateProfile($updateProfileInput: UpdateProfileInput!) {
    update(updateProfileInput: $updateProfileInput) {
      name
      avatar
    }
  }
`;
