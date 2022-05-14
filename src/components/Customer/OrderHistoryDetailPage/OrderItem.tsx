import {
  faArrowAltCircleDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { addItemToCart, CartItem } from "../../../apollo/reactiveVar/cart";
import ItemInCart from "../CartComponent/ItemInCart";
import { ReviewModal } from "./ReviewModal";
interface OrderItemInterface {
  cartItem: CartItem;
  price: number;
  id: string;
  restaurantId?: string | null;
}
export const OrderItem: FC<OrderItemInterface> = ({
  cartItem,
  price,
  id,
  restaurantId,
}) => {
  const [reviewInput, setOpenReviewInput] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const handleAddToCartAgain = () => {
    if (!restaurantId) return toast.error("Can not find restaurant!");
    addItemToCart(cartItem, +restaurantId);
    toast.success("Added to cart!");
  };
  return (
    <Fragment>
      <ReviewModal
        open={reviewInput}
        setOpen={setOpenReviewInput}
        orderItemId={id}
      />
      <div
        onClick={() => setOpenAction((pre) => !pre)}
        className="w-full flex flex-col space-y-[0.3rem]"
      >
        <ItemInCart
          canClickEdit={false}
          cartItem={cartItem}
          price={price}
        ></ItemInCart>
        {openAction && (
          <div className="w-full flex justify-end space-x-3">
            <button
              onClick={() => setOpenReviewInput(true)}
              className="flex items-center space-x-2 py-2 px-1 bg-blue-500 rounded text-white hover:bg-blue-600 font-semibold text-sm sm:text-base sm:px-2"
            >
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <h1>Write a review</h1>
            </button>
            <button
              onClick={() => handleAddToCartAgain()}
              className="flex space-x-2 items-center py-2 px-1 bg-green-500 rounded text-white hover:bg-green-600 font-semibold text-sm sm:text-base sm:px-2"
            >
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
              <h1>Add to cart again</h1>
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
