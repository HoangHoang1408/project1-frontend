/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus, PaymentMethods } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrdersQuery
// ====================================================

export interface GetOrdersQuery_getOrders_error {
  __typename: "CustomError";
  message: string;
}

export interface GetOrdersQuery_getOrders_orders_restaurant {
  __typename: "Restaurant";
  id: string;
  restaurantName: string;
}

export interface GetOrdersQuery_getOrders_orders_driver {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: GetOrdersQuery_getOrders_orders_orderItems_dish_dishOptions_options[];
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: GetOrdersQuery_getOrders_orders_orderItems_dish_comments_user_avatarImage | null;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: GetOrdersQuery_getOrders_orders_orderItems_dish_comments_user;
  rating: number;
  createdAt: any;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_dish {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: GetOrdersQuery_getOrders_orders_orderItems_dish_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: GetOrdersQuery_getOrders_orders_orderItems_dish_dishOptions[] | null;
  comments: GetOrdersQuery_getOrders_orders_orderItems_dish_comments[] | null;
}

export interface GetOrdersQuery_getOrders_orders_orderItems_choosenOptions {
  __typename: "ChoosenOption";
  typeName: string;
  optionName: string;
}

export interface GetOrdersQuery_getOrders_orders_orderItems {
  __typename: "OrderItem";
  id: string;
  dish: GetOrdersQuery_getOrders_orders_orderItems_dish;
  choosenOptions: GetOrdersQuery_getOrders_orders_orderItems_choosenOptions[] | null;
  quantity: number;
  extraRequirement: string;
  totalOrderItemPrice: number;
}

export interface GetOrdersQuery_getOrders_orders {
  __typename: "Order";
  id: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  restaurant: GetOrdersQuery_getOrders_orders_restaurant | null;
  driver: GetOrdersQuery_getOrders_orders_driver | null;
  createdAt: any;
  deliveryAddress: string;
  addressDetail: string | null;
  deliveryNote: string | null;
  method: PaymentMethods;
  orderCode: string;
  orderItems: GetOrdersQuery_getOrders_orders_orderItems[];
}

export interface GetOrdersQuery_getOrders {
  __typename: "GetOrdersOuput";
  error: GetOrdersQuery_getOrders_error | null;
  orders: GetOrdersQuery_getOrders_orders[] | null;
}

export interface GetOrdersQuery {
  getOrders: GetOrdersQuery_getOrders;
}

export interface GetOrdersQueryVariables {
  input: GetOrdersInput;
}
