import { gql } from "@apollo/client";
import { DISH_FRAGMENT } from "./FullRestaurantFragment";
export const FULL_ORDER_FRAGMENT = gql`
  ${DISH_FRAGMENT}
  fragment FullOrderFragment on Order {
    id
    totalPrice
    orderStatus
    restaurant {
      id
      restaurantName
    }
    driver {
      id
      name
    }
    createdAt
    deliveryAddress
    addressDetail
    deliveryNote
    method
    orderCode
    orderItems {
      id
      dish {
        ...Dish
      }
      choosenOptions {
        typeName
        optionName
      }
      quantity
      extraRequirement
      totalOrderItemPrice
    }
  }
`;
