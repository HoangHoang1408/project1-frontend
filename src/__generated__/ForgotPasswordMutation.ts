/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ForgotPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ForgotPasswordMutation
// ====================================================

export interface ForgotPasswordMutation_forgotPassword_error {
  __typename: "CustomError";
  message: string;
}

export interface ForgotPasswordMutation_forgotPassword {
  __typename: "ForgotPasswordOutput";
  ok: boolean;
  error: ForgotPasswordMutation_forgotPassword_error | null;
}

export interface ForgotPasswordMutation {
  forgotPassword: ForgotPasswordMutation_forgotPassword;
}

export interface ForgotPasswordMutationVariables {
  input: ForgotPasswordInput;
}
