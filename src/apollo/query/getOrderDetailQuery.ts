import { gql } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "./../fragment/FullOrderFragment";
export const GET_ORDER_DETAIL_QUERY = gql`
  ${FULL_ORDER_FRAGMENT}
  query GetOrderDetailQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      error {
        message
      }
      order {
        ...FullOrderFragment
      }
    }
  }
`;
