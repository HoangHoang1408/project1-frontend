/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Customer = "Customer",
  Driver = "Driver",
  Owner = "Owner",
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetRestaurantInput {
  restaurantId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
