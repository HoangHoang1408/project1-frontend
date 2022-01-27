import { gql } from "@apollo/client";
export const RESTAURANT_CART_FRAGMENT = gql`
  fragment RestaurantCard on Restaurant {
    id
    rating
    backgroundImage {
      imagePath
      imageUrl
    }
    restaurantName
    categories {
      name
    }
    openTime
    closeTime
  }
`;
