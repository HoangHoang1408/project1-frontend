/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: RetaurantQuery
// ====================================================

export interface RetaurantQuery_getRestaurant_error {
  __typename: "CustomError";
  field: string;
  message: string;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions_options[];
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user_avatarImage | null;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user;
  rating: number;
  createdAt: any;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  dishImage: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions[] | null;
  comments: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments[] | null;
}

export interface RetaurantQuery_getRestaurant_restaurant_dishGroups {
  __typename: "DishGroup";
  id: string;
  dishGroupName: string;
  dishes: RetaurantQuery_getRestaurant_restaurant_dishGroups_dishes[] | null;
}

export interface RetaurantQuery_getRestaurant_restaurant_categories {
  __typename: "RestaurantCategory";
  id: string;
  name: string;
}

export interface RetaurantQuery_getRestaurant_restaurant_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RetaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: string;
  rating: number | null;
  dishGroups: RetaurantQuery_getRestaurant_restaurant_dishGroups[] | null;
  categories: RetaurantQuery_getRestaurant_restaurant_categories[] | null;
  restaurantName: string;
  address: string;
  backgroundImage: RetaurantQuery_getRestaurant_restaurant_backgroundImage | null;
  openTime: any | null;
  closeTime: any | null;
}

export interface RetaurantQuery_getRestaurant {
  __typename: "GetRestaurantOutput";
  ok: boolean;
  error: RetaurantQuery_getRestaurant_error | null;
  restaurant: RetaurantQuery_getRestaurant_restaurant | null;
}

export interface RetaurantQuery {
  getRestaurant: RetaurantQuery_getRestaurant;
}

export interface RetaurantQueryVariables {
  input: GetRestaurantInput;
}
