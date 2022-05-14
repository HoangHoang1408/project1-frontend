import { gql } from "@apollo/client";
import { FULL_RESTAURANT_FRAGMENT } from "../fragment/FullRestaurantFragment";
export const Restaurant_QUERY = gql`
  ${FULL_RESTAURANT_FRAGMENT}
  query RestaurantQuery($input: GetRestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error {
        field
        message
      }
      restaurant {
        ...FullRestaurant
      }
    }
  }
`;
