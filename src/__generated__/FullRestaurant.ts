/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullRestaurant
// ====================================================

export interface FullRestaurant_dishGroups_dishes_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface FullRestaurant_dishGroups_dishes_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface FullRestaurant_dishGroups_dishes_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: FullRestaurant_dishGroups_dishes_dishOptions_options[];
}

export interface FullRestaurant_dishGroups_dishes_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface FullRestaurant_dishGroups_dishes_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: FullRestaurant_dishGroups_dishes_comments_user_avatarImage | null;
}

export interface FullRestaurant_dishGroups_dishes_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: FullRestaurant_dishGroups_dishes_comments_user;
  rating: number;
  createdAt: any;
}

export interface FullRestaurant_dishGroups_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  dishImage: FullRestaurant_dishGroups_dishes_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: FullRestaurant_dishGroups_dishes_dishOptions[] | null;
  comments: FullRestaurant_dishGroups_dishes_comments[] | null;
}

export interface FullRestaurant_dishGroups {
  __typename: "DishGroup";
  id: string;
  dishGroupName: string;
  dishes: FullRestaurant_dishGroups_dishes[] | null;
}

export interface FullRestaurant_categories {
  __typename: "RestaurantCategory";
  id: string;
  name: string;
}

export interface FullRestaurant_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface FullRestaurant {
  __typename: "Restaurant";
  id: string;
  rating: number | null;
  dishGroups: FullRestaurant_dishGroups[] | null;
  categories: FullRestaurant_categories[] | null;
  restaurantName: string;
  address: string;
  backgroundImage: FullRestaurant_backgroundImage | null;
  openTime: any | null;
  closeTime: any | null;
}
