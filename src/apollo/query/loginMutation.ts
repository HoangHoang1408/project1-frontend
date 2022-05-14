import { gql } from "@apollo/client";
import { SIMPLE_USER_FRAGMENT } from "../fragment/SimpleUserFragment";
export const LOGIN_MUTATION = gql`
  ${SIMPLE_USER_FRAGMENT}
  mutation LoginMutaion($input: LoginInput!) {
    login(input: $input) {
      ok
      error {
        message
      }
      accessToken
      user {
        ...SimpleUser
      }
    }
  }
`;
