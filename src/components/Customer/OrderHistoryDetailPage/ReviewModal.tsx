import { useMutation } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { CREATE_DISH_REVIEW_MUTATION } from "../../../apollo/query/createDishReviewMutation";
import {
  CreateDishReviewMutation,
  CreateDishReviewMutationVariables,
} from "../../../__generated__/CreateDishReviewMutation";
import LoadingButton from "../../custom/button/LoadingButton";
import Modal from "../../layout/Modal";
interface ReviewModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orderItemId: string;
}
export const ReviewModal: FC<ReviewModalProps> = ({
  open,
  setOpen,
  orderItemId,
}) => {
  const [textInput, setTextInput] = useState<string | null>(null);
  const [star, setStar] = useState(5);
  const [review, { loading }] = useMutation<
    CreateDishReviewMutation,
    CreateDishReviewMutationVariables
  >(CREATE_DISH_REVIEW_MUTATION, {
    onError() {
      toast.error("Cant not create review right now. Try again later!");
    },
    onCompleted(data) {
      const errorMsg = data.addDishComment.error?.message;
      if (errorMsg) return toast.error(errorMsg);
      toast.success("Comment added!");
    },
  });
  const handleSendReview = async () => {
    if (!textInput || textInput?.length === 0)
      return toast.warn("Please input text comment!");
    await review({
      variables: {
        input: {
          orderItemId,
          rating: star,
          text: textInput,
        },
      },
    });
    setOpen(false);
  };
  return (
    <Modal size="sm" open={open} setOpenModal={setOpen}>
      <div className="flex flex-col space-y-3 w-full py-2">
        <h1 className="text-green-600 font-bold text-2xl">Review</h1>
        <div className="flex flex-col">
          <h1 className="font-semibold text-green-500">Rating</h1>
          <div className="flex space-x-[0.2rem]">
            {[1, 2, 3, 4, 5].map((e) => {
              const active = e <= star ? "text-yellow-400" : "text-slate-400";
              return (
                <FontAwesomeIcon
                  key={e}
                  onClick={() => setStar(e)}
                  icon={faStar}
                  className={"cursor-pointer " + active}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-green-500" htmlFor="">
            Text
          </label>
          <input
            onChange={(e) => setTextInput(e.target.value)}
            className="border border-slate-400 hover:border-green-500 focus:border-green-500 py-1 px-2 rounded outline-none text-sm"
            type="text"
          />
        </div>
        <LoadingButton loading={loading} onClick={() => handleSendReview()}>
          <h1 className="w-full h-full text-xl grid place-items-center py-2 px-3 bg-green-500 hover:bg-green-600">
            Send review
          </h1>
        </LoadingButton>
      </div>
    </Modal>
  );
};
