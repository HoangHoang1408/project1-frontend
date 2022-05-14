/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrderMutation
// ====================================================

export interface CreateOrderMutation_createOrder_error {
  __typename: "CustomError";
  message: string;
}

export interface CreateOrderMutation_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  error: CreateOrderMutation_createOrder_error | null;
}

export interface CreateOrderMutation {
  createOrder: CreateOrderMutation_createOrder;
}

export interface CreateOrderMutationVariables {
  input: CreateOrderInput;
}
