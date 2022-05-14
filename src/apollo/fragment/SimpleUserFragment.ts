import { gql } from "@apollo/client";
export const SIMPLE_USER_FRAGMENT = gql`
  fragment SimpleUser on User {
    id
    address
    email
    phoneNumber
    verified
    name
    role
    avatarImage {
      imagePath
      imageUrl
    }
    backgroundImage {
      imagePath
      imageUrl
    }
  }
`;
