import { gql } from "@apollo/client";
export const CREATE_DISH_REVIEW_MUTATION = gql`
  mutation CreateDishReviewMutation($input: AddDishCommentInput!) {
    addDishComment(input: $input) {
      ok
      error {
        message
      }
    }
  }
`;
