/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDishBySlugInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDishDetailBySlug
// ====================================================

export interface GetDishDetailBySlug_getDishDetailBySlug_error {
  __typename: "CustomError";
  message: string;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: GetDishDetailBySlug_getDishDetailBySlug_dish_dishOptions_options[];
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: GetDishDetailBySlug_getDishDetailBySlug_dish_comments_user_avatarImage | null;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: GetDishDetailBySlug_getDishDetailBySlug_dish_comments_user;
  rating: number;
  createdAt: any;
}

export interface GetDishDetailBySlug_getDishDetailBySlug_dish {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: GetDishDetailBySlug_getDishDetailBySlug_dish_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: GetDishDetailBySlug_getDishDetailBySlug_dish_dishOptions[] | null;
  comments: GetDishDetailBySlug_getDishDetailBySlug_dish_comments[] | null;
}

export interface GetDishDetailBySlug_getDishDetailBySlug {
  __typename: "GetDishOutput";
  ok: boolean;
  error: GetDishDetailBySlug_getDishDetailBySlug_error | null;
  dish: GetDishDetailBySlug_getDishDetailBySlug_dish | null;
}

export interface GetDishDetailBySlug {
  getDishDetailBySlug: GetDishDetailBySlug_getDishDetailBySlug;
}

export interface GetDishDetailBySlugVariables {
  input: GetDishBySlugInput;
}
