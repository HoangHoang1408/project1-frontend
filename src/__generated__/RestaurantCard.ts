/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantCard
// ====================================================

export interface RestaurantCard_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface RestaurantCard_categories {
  __typename: "RestaurantCategory";
  name: string;
}

export interface RestaurantCard {
  __typename: "Restaurant";
  id: string;
  rating: number | null;
  backgroundImage: RestaurantCard_backgroundImage | null;
  restaurantName: string;
  categories: RestaurantCard_categories[] | null;
  openTime: any | null;
  closeTime: any | null;
}
