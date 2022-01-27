/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginMutaion
// ====================================================

export interface LoginMutaion_login_error {
  __typename: "CustomError";
  message: string;
}

export interface LoginMutaion_login_user_avatarImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface LoginMutaion_login_user_backgroundImage {
  __typename: "Image";
  imagePath: string;
  imageUrl: string;
}

export interface LoginMutaion_login_user {
  __typename: "User";
  id: string;
  address: string | null;
  email: string;
  phoneNumber: string | null;
  verified: boolean;
  name: string;
  role: UserRole;
  avatarImage: LoginMutaion_login_user_avatarImage | null;
  backgroundImage: LoginMutaion_login_user_backgroundImage | null;
}

export interface LoginMutaion_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: LoginMutaion_login_error | null;
  accessToken: string | null;
  user: LoginMutaion_login_user | null;
}

export interface LoginMutaion {
  login: LoginMutaion_login;
}

export interface LoginMutaionVariables {
  input: LoginInput;
}
