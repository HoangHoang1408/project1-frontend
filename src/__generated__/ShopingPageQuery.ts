/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopingPageQuery
// ====================================================

export interface ShopingPageQuery_topRestaurants_error {
  __typename: "CustomError";
  message: string;
}

export interface ShopingPageQuery_topRestaurants_restaurants_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface ShopingPageQuery_topRestaurants_restaurants_categories {
  __typename: "RestaurantCategory";
  name: string;
}

export interface ShopingPageQuery_topRestaurants_restaurants {
  __typename: "Restaurant";
  id: string;
  rating: number | null;
  backgroundImage: ShopingPageQuery_topRestaurants_restaurants_backgroundImage | null;
  restaurantName: string;
  categories: ShopingPageQuery_topRestaurants_restaurants_categories[] | null;
  openTime: any | null;
  closeTime: any | null;
}

export interface ShopingPageQuery_topRestaurants {
  __typename: "TopRestaurantsOutput";
  ok: boolean;
  error: ShopingPageQuery_topRestaurants_error | null;
  restaurants: ShopingPageQuery_topRestaurants_restaurants[] | null;
}

export interface ShopingPageQuery_topRestaurantCategories_error {
  __typename: "CustomError";
  message: string;
}

export interface ShopingPageQuery_topRestaurantCategories_restaurantCategories_coverImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface ShopingPageQuery_topRestaurantCategories_restaurantCategories {
  __typename: "RestaurantCategory";
  id: string;
  name: string;
  coverImage: ShopingPageQuery_topRestaurantCategories_restaurantCategories_coverImage | null;
}

export interface ShopingPageQuery_topRestaurantCategories {
  __typename: "TopCategoriesOutput";
  ok: boolean;
  error: ShopingPageQuery_topRestaurantCategories_error | null;
  restaurantCategories: ShopingPageQuery_topRestaurantCategories_restaurantCategories[] | null;
}

export interface ShopingPageQuery {
  topRestaurants: ShopingPageQuery_topRestaurants;
  topRestaurantCategories: ShopingPageQuery_topRestaurantCategories;
}
