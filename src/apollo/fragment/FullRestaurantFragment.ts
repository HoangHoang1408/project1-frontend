import { gql } from "@apollo/client";
export const DISH_COMMENT_FRAGMENT = gql`
  fragment DishComment on DishComment {
    id
    updatedAt
    text
    user {
      id
      name
      avatarImage {
        imagePath
        imageUrl
      }
    }
    rating
    createdAt
  }
`;
export const DISH_FRAGMENT = gql`
  ${DISH_COMMENT_FRAGMENT}
  fragment Dish on Dish {
    id
    name
    slug
    dishImage {
      imagePath
      imageUrl
    }
    price
    averageRating
    description
    discount
    dishOptions {
      typeName
      options {
        optionName
        extraPrice
      }
    }
    comments {
      ...DishComment
    }
  }
`;
export const DISH_GROUP_FRAGMENT = gql`
  ${DISH_FRAGMENT}
  fragment DishGroup on DishGroup {
    id
    dishGroupName
    dishes {
      ...Dish
    }
  }
`;
export const FULL_RESTAURANT_FRAGMENT = gql`
  ${DISH_GROUP_FRAGMENT}
  fragment FullRestaurant on Restaurant {
    id
    rating
    dishGroups {
      ...DishGroup
    }
    categories {
      id
      name
    }
    restaurantName
    address
    coordinates {
      latitude
      longtitude
    }
    backgroundImage {
      imagePath
      imageUrl
    }
    openTime
    closeTime
  }
`;
