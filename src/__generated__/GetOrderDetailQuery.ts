/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus, PaymentMethods } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOrderDetailQuery
// ====================================================

export interface GetOrderDetailQuery_getOrder_error {
  __typename: "CustomError";
  message: string;
}

export interface GetOrderDetailQuery_getOrder_order_restaurant {
  __typename: "Restaurant";
  id: string;
  restaurantName: string;
}

export interface GetOrderDetailQuery_getOrder_order_driver {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: GetOrderDetailQuery_getOrder_order_orderItems_dish_dishOptions_options[];
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: GetOrderDetailQuery_getOrder_order_orderItems_dish_comments_user_avatarImage | null;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: GetOrderDetailQuery_getOrder_order_orderItems_dish_comments_user;
  rating: number;
  createdAt: any;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_dish {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: GetOrderDetailQuery_getOrder_order_orderItems_dish_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: GetOrderDetailQuery_getOrder_order_orderItems_dish_dishOptions[] | null;
  comments: GetOrderDetailQuery_getOrder_order_orderItems_dish_comments[] | null;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems_choosenOptions {
  __typename: "ChoosenOption";
  typeName: string;
  optionName: string;
}

export interface GetOrderDetailQuery_getOrder_order_orderItems {
  __typename: "OrderItem";
  id: string;
  dish: GetOrderDetailQuery_getOrder_order_orderItems_dish;
  choosenOptions: GetOrderDetailQuery_getOrder_order_orderItems_choosenOptions[] | null;
  quantity: number;
  extraRequirement: string;
  totalOrderItemPrice: number;
}

export interface GetOrderDetailQuery_getOrder_order {
  __typename: "Order";
  id: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  restaurant: GetOrderDetailQuery_getOrder_order_restaurant | null;
  driver: GetOrderDetailQuery_getOrder_order_driver | null;
  createdAt: any;
  deliveryAddress: string;
  addressDetail: string | null;
  deliveryNote: string | null;
  method: PaymentMethods;
  orderCode: string;
  orderItems: GetOrderDetailQuery_getOrder_order_orderItems[];
}

export interface GetOrderDetailQuery_getOrder {
  __typename: "GetOrderOuput";
  error: GetOrderDetailQuery_getOrder_error | null;
  order: GetOrderDetailQuery_getOrder_order | null;
}

export interface GetOrderDetailQuery {
  getOrder: GetOrderDetailQuery_getOrder;
}

export interface GetOrderDetailQueryVariables {
  input: GetOrderInput;
}
