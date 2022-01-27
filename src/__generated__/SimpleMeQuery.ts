/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: SimpleMeQuery
// ====================================================

export interface SimpleMeQuery_me_error {
  __typename: "CustomError";
  message: string;
}

export interface SimpleMeQuery_me_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface SimpleMeQuery_me_user_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface SimpleMeQuery_me_user {
  __typename: "User";
  id: string;
  address: string | null;
  email: string;
  phoneNumber: string | null;
  verified: boolean;
  name: string;
  role: UserRole;
  avatarImage: SimpleMeQuery_me_user_avatarImage | null;
  backgroundImage: SimpleMeQuery_me_user_backgroundImage | null;
}

export interface SimpleMeQuery_me {
  __typename: "MeOutPut";
  ok: boolean;
  error: SimpleMeQuery_me_error | null;
  user: SimpleMeQuery_me_user | null;
}

export interface SimpleMeQuery {
  me: SimpleMeQuery_me;
}
