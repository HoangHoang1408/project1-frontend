import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { GetOrderDetailQuery_getOrder_order } from "../../../__generated__/GetOrderDetailQuery";
import ApplyFee from "../common/ApplyFee";
import { OrderItem } from "./OrderItem";

interface OrderItemsInterface {
  order: GetOrderDetailQuery_getOrder_order;
  restaurantId?: string | null;
}
export const OrderItems: FC<OrderItemsInterface> = ({
  order,
  restaurantId,
}) => {
  const [applyFeeInfosModalOpen, setApplyFeeInfosModalOpen] = useState(false);
  return (
    <div className="flex flex-col w-full space-y-3">
      <ApplyFee
        open={applyFeeInfosModalOpen}
        setOpen={setApplyFeeInfosModalOpen}
      />
      <h1 className="text-green-600 font-bold text-xl">Order Items</h1>
      <div className="w-full flex flex-col space-y-2 px-2">
        {order.orderItems.map(
          ({
            choosenOptions,
            extraRequirement,
            dish,
            quantity,
            id,
            totalOrderItemPrice,
          }) => {
            const cartItem = {
              choosenOptions: choosenOptions || [],
              dish,
              quantity,
              requirement: extraRequirement,
            };
            return (
              <OrderItem
                key={id}
                cartItem={cartItem}
                price={totalOrderItemPrice}
                id={id}
                restaurantId={restaurantId}
              />
            );
          }
        )}
      </div>
      <div className="font-semibold text-slate-700 mt-4 pt-1 border border-t-slate-300 border-transparent text-sm sm:text-base">
        <div className="flex justify-between">
          <h1>
            Apply fees{" "}
            <span
              onClick={() => setApplyFeeInfosModalOpen(true)}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                className="text-green-500 hover:text-green-600"
                icon={faInfoCircle}
              />
            </span>
          </h1>
          <h1 className="text-green-600 font-bold">{1.2}$</h1>
        </div>
        <div className="flex justify-between">
          <h1>Total price</h1>
          <h1 className="text-green-600 font-bold ">{order.totalPrice}$</h1>
        </div>
      </div>
    </div>
  );
};
