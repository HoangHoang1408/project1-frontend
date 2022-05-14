import { gql } from "@apollo/client";
import { SIMPLE_USER_FRAGMENT } from "../fragment/SimpleUserFragment";
export const USER_OBJECT_QUERY = gql`
  ${SIMPLE_USER_FRAGMENT}
  query SimpleMeQuery {
    me {
      ok
      error {
        message
      }
      user {
        ...SimpleUser
      }
    }
  }
`;
