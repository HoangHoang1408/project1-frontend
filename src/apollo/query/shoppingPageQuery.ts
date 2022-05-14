import { gql } from "@apollo/client";
import { RESTAURANT_CART_FRAGMENT } from "../fragment/RestaurantCardFragment";
export const SHOPING_PAGE_QUERY = gql`
  ${RESTAURANT_CART_FRAGMENT}
  query ShopingPageQuery {
    topRestaurants {
      ok
      error {
        message
      }
      restaurants {
        ...RestaurantCard
      }
    }
    topRestaurantCategories {
      ok
      error {
        message
      }
      restaurantCategories {
        id
        name
        coverImage {
          imagePath
          imageUrl
        }
      }
    }
  }
`;
