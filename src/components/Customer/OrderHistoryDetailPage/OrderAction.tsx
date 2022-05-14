import { useMutation } from "@apollo/client";
import {
  faArrowAltCircleDown,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "../../../apollo/client";
import { UPDATE_ORDER_STATUS_MUTATION } from "../../../apollo/query/updateOrderStatusMutation";
import { addItemToCart, cartVar } from "../../../apollo/reactiveVar/cart";
import { GetOrderDetailQuery_getOrder_order } from "../../../__generated__/GetOrderDetailQuery";
import { OrderStatus } from "../../../__generated__/globalTypes";
import {
  UpdateOrderStatusMutation,
  UpdateOrderStatusMutationVariables,
} from "../../../__generated__/UpdateOrderStatusMutation";
import LoadingButton from "../../custom/button/LoadingButton";
import ConfirmModal from "../../layout/ConfirmModal";
interface OrderHistoryActionProps {
  status: OrderStatus;
  order: GetOrderDetailQuery_getOrder_order;
  restaurantId?: string;
}
export const OrderAction: FC<OrderHistoryActionProps> = ({
  status,
  order,
  restaurantId,
}) => {
  console.log(status === OrderStatus.PendingOrder);
  // states
  const navigate = useNavigate();
  const [openConfirmRemoveCartItemsModal, setOpenConfirmRemoveCartItemsModal] =
    useState(false);
  const [confirmRemoveCartItems, setConfirmRemoveCartItems] = useState<
    boolean | null
  >(null);
  const [openConfirmCancelOrderModal, setOpenConfirmCancelOrderModal] =
    useState(false);
  const [confirmCancelOrder, setConfirmCancelOrder] = useState<boolean | null>(
    null
  );

  // mutations
  const [updateOrderStatus, { loading: cancelOrderLoading }] = useMutation<
    UpdateOrderStatusMutation,
    UpdateOrderStatusMutationVariables
  >(UPDATE_ORDER_STATUS_MUTATION, {
    variables: {
      input: {
        orderId: +order.id,
        orderStatus: OrderStatus.CustomerCancelled,
      },
    },
    onError() {
      toast.error("Update order status fail. Please try again later!");
    },
    onCompleted(data) {
      const error = data.updateOrderStatus.error?.message;
      if (error) return toast.error(error);
      client.cache.modify({
        id: `Order:${order.id}`,
        fields: {
          orderStatus() {
            return OrderStatus.CustomerCancelled;
          },
        },
      });
      toast.success("Order cancelled");
    },
  });
  const orderAgain = useCallback(() => {
    if (!restaurantId)
      return toast.error("Restaurant id not found. Please try again later!");
    cartVar(null);
    order.orderItems.forEach(
      ({ choosenOptions, dish, quantity, extraRequirement }) => {
        const cartItem = {
          choosenOptions: choosenOptions || [],
          dish,
          quantity,
          requirement: extraRequirement,
        };
        addItemToCart(cartItem, +restaurantId);
      }
    );
    navigate("/process-order");
  }, [order.orderItems, navigate, restaurantId]);

  // confirm effects
  useEffect(() => {
    if (confirmRemoveCartItems === null) return;
    if (confirmRemoveCartItems) orderAgain();
    setConfirmRemoveCartItems(null);
  }, [confirmRemoveCartItems, orderAgain]);
  useEffect(() => {
    if (confirmCancelOrder) updateOrderStatus();
    setConfirmCancelOrder(null);
  }, [order.id, updateOrderStatus, confirmCancelOrder]);

  // click event hanlders
  const handleOrderAgain = () => {
    const cart = cartVar();
    if (cart?.cartItems && cart.cartItems.length > 0) {
      return setOpenConfirmRemoveCartItemsModal(true);
    }
    setConfirmRemoveCartItems(true);
  };
  return (
    <Fragment>
      {openConfirmRemoveCartItemsModal && (
        <div>
          <ConfirmModal
            openConfirmModal={openConfirmRemoveCartItemsModal}
            setOpenConfirmModal={setOpenConfirmRemoveCartItemsModal}
            setConfirm={setConfirmRemoveCartItems}
            closeButtonText="Cancel"
            continueButtonText="Continue"
          >
            <div className="font-semibold text-slate-700 flex flex-col space-y-2">
              <h1 className="text-green-600 font-bold text-2xl">
                Your cart is containing items
              </h1>
              <h1 className="text-base">
                Do you want to remove them and move to process order page?
              </h1>
            </div>
          </ConfirmModal>
        </div>
      )}
      {openConfirmCancelOrderModal && (
        <div>
          <ConfirmModal
            openConfirmModal={openConfirmCancelOrderModal}
            setOpenConfirmModal={setOpenConfirmCancelOrderModal}
            setConfirm={setConfirmCancelOrder}
            closeButtonText="Close"
            continueButtonText="Cancel Order"
          >
            <div className="font-semibold text-slate-700 flex flex-col space-y-2">
              <h1 className="text-red-600 font-bold text-2xl">Cancel order</h1>
              <h1 className="text-base">
                Do you want to cancel order {order.orderCode}
              </h1>
            </div>
          </ConfirmModal>
        </div>
      )}
      <div className="w-full flex flex-col space-y-2">
        <div className="w-full flex justify-end space-x-3">
          {status === OrderStatus.PendingOrder && (
            <LoadingButton
              loading={cancelOrderLoading}
              onClick={() => setOpenConfirmCancelOrderModal(true)}
            >
              <div className="w-full h-full px-3 flex space-x-2 items-center bg-red-500 hover:bg-red-600">
                <FontAwesomeIcon icon={faTimesCircle} />
                <h1>Cancel order</h1>
              </div>
            </LoadingButton>
          )}
          {status === OrderStatus.Completed && (
            <LoadingButton loading={false} onClick={() => handleOrderAgain()}>
              <div className="w-full h-full px-3 flex space-x-2 items-center bg-green-500 hover:bg-green-600">
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                <h1>Order again</h1>
              </div>
            </LoadingButton>
          )}
        </div>
      </div>
    </Fragment>
  );
};
