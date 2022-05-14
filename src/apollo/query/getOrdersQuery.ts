import { gql } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "./../fragment/FullOrderFragment";
export const GET_ORDERS_QUERY = gql`
  ${FULL_ORDER_FRAGMENT}
  query GetOrdersQuery($input: GetOrdersInput!) {
    getOrders(input: $input) {
      error {
        message
      }
      orders {
        ...FullOrderFragment
      }
    }
  }
`;
