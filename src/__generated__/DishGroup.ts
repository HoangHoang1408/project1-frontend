/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishGroup
// ====================================================

export interface DishGroup_dishes_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface DishGroup_dishes_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface DishGroup_dishes_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: DishGroup_dishes_dishOptions_options[];
}

export interface DishGroup_dishes_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface DishGroup_dishes_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: DishGroup_dishes_comments_user_avatarImage | null;
}

export interface DishGroup_dishes_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: DishGroup_dishes_comments_user;
  rating: number;
  createdAt: any;
}

export interface DishGroup_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: DishGroup_dishes_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: DishGroup_dishes_dishOptions[] | null;
  comments: DishGroup_dishes_comments[] | null;
}

export interface DishGroup {
  __typename: "DishGroup";
  id: string;
  dishGroupName: string;
  dishes: DishGroup_dishes[] | null;
}
