import { useReactiveVar } from "@apollo/client";
import React, { FC } from "react";
import { cartVar } from "../../../apollo/reactiveVar/cart";
import LoadingButton from "../../custom/button/LoadingButton";
import { PartialOrderPage } from "./PartialOrderPage";
interface Props {
  createOrder: () => void;
  createOrderLoading: boolean;
}
const OrderActionPart: FC<Props> = ({ createOrder, createOrderLoading }) => {
  const cart = useReactiveVar(cartVar);
  return (
    <PartialOrderPage>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-xl font-bold">
          <h1 className="text-slate-700">Total:</h1>
          <h1 className="text-green-600">
            {Math.round((cart?.totalPrice || 0) * 100 + 1.2 * 100) / 100}$
          </h1>
        </div>
        <LoadingButton
          onClick={() => createOrder()}
          loading={createOrderLoading}
        >
          <h1 className="w-full h-full grid place-items-center text-xl font-bold px-3 bg-green-500 hover:bg-green-600">
            Order
          </h1>
        </LoadingButton>
      </div>
    </PartialOrderPage>
  );
};

export default OrderActionPart;
