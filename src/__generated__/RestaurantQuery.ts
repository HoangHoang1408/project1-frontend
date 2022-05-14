/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: RestaurantQuery
// ====================================================

export interface RestaurantQuery_getRestaurant_error {
  __typename: "CustomError";
  field: string;
  message: string;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions_options {
  __typename: "Option";
  optionName: string;
  extraPrice: number;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions {
  __typename: "DishOption";
  typeName: string;
  options: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions_options[];
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user_avatarImage | null;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments_user;
  rating: number;
  createdAt: any;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  slug: string;
  dishImage: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishImage | null;
  price: number;
  averageRating: number | null;
  description: string;
  discount: number | null;
  dishOptions: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_dishOptions[] | null;
  comments: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes_comments[] | null;
}

export interface RestaurantQuery_getRestaurant_restaurant_dishGroups {
  __typename: "DishGroup";
  id: string;
  dishGroupName: string;
  dishes: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes[] | null;
}

export interface RestaurantQuery_getRestaurant_restaurant_categories {
  __typename: "RestaurantCategory";
  id: string;
  name: string;
}

export interface RestaurantQuery_getRestaurant_restaurant_coordinates {
  __typename: "Coordinates";
  latitude: number;
  longtitude: number;
}

export interface RestaurantQuery_getRestaurant_restaurant_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RestaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: string;
  rating: number | null;
  dishGroups: RestaurantQuery_getRestaurant_restaurant_dishGroups[] | null;
  categories: RestaurantQuery_getRestaurant_restaurant_categories[] | null;
  restaurantName: string;
  address: string;
  coordinates: RestaurantQuery_getRestaurant_restaurant_coordinates;
  backgroundImage: RestaurantQuery_getRestaurant_restaurant_backgroundImage | null;
  openTime: any | null;
  closeTime: any | null;
}

export interface RestaurantQuery_getRestaurant {
  __typename: "GetRestaurantOutput";
  ok: boolean;
  error: RestaurantQuery_getRestaurant_error | null;
  restaurant: RestaurantQuery_getRestaurant_restaurant | null;
}

export interface RestaurantQuery {
  getRestaurant: RestaurantQuery_getRestaurant;
}

export interface RestaurantQueryVariables {
  input: GetRestaurantInput;
}
