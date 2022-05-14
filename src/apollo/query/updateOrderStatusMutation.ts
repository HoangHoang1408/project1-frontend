import { gql } from "@apollo/client";

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatusMutation($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      ok
      error {
        message
      }
    }
  }
`;
