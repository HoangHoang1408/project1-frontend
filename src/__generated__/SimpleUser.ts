/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: SimpleUser
// ====================================================

export interface SimpleUser_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface SimpleUser_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface SimpleUser {
  __typename: "User";
  id: string;
  address: string | null;
  email: string;
  phoneNumber: string | null;
  verified: boolean;
  name: string;
  role: UserRole;
  avatarImage: SimpleUser_avatarImage | null;
  backgroundImage: SimpleUser_backgroundImage | null;
}
