import { gql } from "@apollo/client";
import { DISH_FRAGMENT } from "./../fragment/FullRestaurantFragment";
export const GET_DISH_DETAIL_BY_SLUG = gql`
  ${DISH_FRAGMENT}
  query GetDishDetailBySlug($input: GetDishBySlugInput!) {
    getDishDetailBySlug(input: $input) {
      ok
      error {
        message
      }
      dish {
        ...Dish
      }
    }
  }
`;
