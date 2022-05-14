/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, PaymentMethods } from "./globalTypes";

// ====================================================
// GraphQL fragment: FullOrderFragment
// ====================================================

export interface FullOrderFragment_restaurant {
  __typename: "Restaurant";
  id: string;
  restaurantName: string;
}

export interface FullOrderFragment_driver {
  __typename: "User";
  id: string;
  name: string;
}

export interface FullOrderFragment_orderItems_dish_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface FullOrderFragment_orderItems_dish_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface FullOrderFragment_orderItems_dish_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: FullOrderFragment_orderItems_dish_dishOptions_options[];
}

export interface FullOrderFragment_orderItems_dish_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface FullOrderFragment_orderItems_dish_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: FullOrderFragment_orderItems_dish_comments_user_avatarImage | null;
}

export interface FullOrderFragment_orderItems_dish_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: FullOrderFragment_orderItems_dish_comments_user;
  rating: number;
  createdAt: any;
}

export interface FullOrderFragment_orderItems_dish {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: FullOrderFragment_orderItems_dish_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: FullOrderFragment_orderItems_dish_dishOptions[] | null;
  comments: FullOrderFragment_orderItems_dish_comments[] | null;
}

export interface FullOrderFragment_orderItems_choosenOptions {
  __typename: "ChoosenOption";
  typeName: string;
  optionName: string;
}

export interface FullOrderFragment_orderItems {
  __typename: "OrderItem";
  id: string;
  dish: FullOrderFragment_orderItems_dish;
  choosenOptions: FullOrderFragment_orderItems_choosenOptions[] | null;
  quantity: number;
  extraRequirement: string;
  totalOrderItemPrice: number;
}

export interface FullOrderFragment {
  __typename: "Order";
  id: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  restaurant: FullOrderFragment_restaurant | null;
  driver: FullOrderFragment_driver | null;
  createdAt: any;
  deliveryAddress: string;
  addressDetail: string | null;
  deliveryNote: string | null;
  method: PaymentMethods;
  orderCode: string;
  orderItems: FullOrderFragment_orderItems[];
}
