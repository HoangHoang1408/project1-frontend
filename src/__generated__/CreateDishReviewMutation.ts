/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddDishCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDishReviewMutation
// ====================================================

export interface CreateDishReviewMutation_addDishComment_error {
  __typename: "CustomError";
  message: string;
}

export interface CreateDishReviewMutation_addDishComment {
  __typename: "AddDishCommentOutput";
  ok: boolean;
  error: CreateDishReviewMutation_addDishComment_error | null;
}

export interface CreateDishReviewMutation {
  addDishComment: CreateDishReviewMutation_addDishComment;
}

export interface CreateDishReviewMutationVariables {
  input: AddDishCommentInput;
}
