import { gql } from "@apollo/client";
export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error {
        message
      }
    }
  }
`;
