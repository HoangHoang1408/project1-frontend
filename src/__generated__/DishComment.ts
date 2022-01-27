/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishComment
// ====================================================

export interface DishComment_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface DishComment_user {
  __typename: "User";
  id: string;
  name: string;
  avatarImage: DishComment_user_avatarImage | null;
}

export interface DishComment {
  __typename: "DishComment";
  id: string;
  updatedAt: any;
  text: string;
  user: DishComment_user;
  rating: number;
  createdAt: any;
}
