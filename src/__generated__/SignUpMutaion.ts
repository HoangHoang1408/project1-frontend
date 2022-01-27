/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignUpMutaion
// ====================================================

export interface SignUpMutaion_signup_error {
  __typename: "CustomError";
  message: string;
}

export interface SignUpMutaion_signup {
  __typename: "SignUpOutput";
  ok: boolean;
  error: SignUpMutaion_signup_error | null;
}

export interface SignUpMutaion {
  signup: SignUpMutaion_signup;
}

export interface SignUpMutaionVariables {
  input: SignUpInput;
}
