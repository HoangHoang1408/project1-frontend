/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderStatusInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrderStatusMutation
// ====================================================

export interface UpdateOrderStatusMutation_updateOrderStatus_error {
  __typename: "CustomError";
  message: string;
}

export interface UpdateOrderStatusMutation_updateOrderStatus {
  __typename: "UpdateOrderStatusOutput";
  ok: boolean;
  error: UpdateOrderStatusMutation_updateOrderStatus_error | null;
}

export interface UpdateOrderStatusMutation {
  updateOrderStatus: UpdateOrderStatusMutation_updateOrderStatus;
}

export interface UpdateOrderStatusMutationVariables {
  input: UpdateOrderStatusInput;
}
