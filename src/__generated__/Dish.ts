/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Dish
// ====================================================

export interface Dish_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface Dish_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface Dish_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: Dish_dishOptions_options[];
}

export interface Dish_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface Dish_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: Dish_comments_user_avatarImage | null;
}

export interface Dish_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: Dish_comments_user;
  rating: number;
  createdAt: any;
}

export interface Dish {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: Dish_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: Dish_dishOptions[] | null;
  comments: Dish_comments[] | null;
}
