import { useReactiveVar } from "@apollo/client";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { cartVar } from "../../../apollo/reactiveVar/cart";
import ItemInCart from "../../../components/Customer/CartComponent/ItemInCart";
import { PartialOrderPage } from "../../../components/Customer/OrderPage/PartialOrderPage";
import ApplyFee from "../common/ApplyFee";

const OrderSummaryPart = () => {
  const cart = useReactiveVar(cartVar);
  const [applyFeeInfosModalOpen, setApplyFeeInfosModalOpen] = useState(false);
  return (
    <Fragment>
      <ApplyFee
        open={applyFeeInfosModalOpen}
        setOpen={setApplyFeeInfosModalOpen}
      />
      <PartialOrderPage headerName="Order Summary">
        <div className="flex flex-col space-y-1">
          {cart?.cartItems.map((item, i) => {
            return (
              <ItemInCart
                key={i}
                cartItem={item}
                onItemClick={() => {}}
                price={item.totalItemPrice || 0}
                canClickEdit={false}
              />
            );
          })}
        </div>
        <div className="font-semibold text-slate-700 mt-4 pt-1 border border-t-slate-300 border-transparent">
          <div className="flex justify-between">
            <h1>Total provisional price </h1>
            <h1 className="text-green-600 font-bold">
              {cart?.totalPrice || 0}$
            </h1>
          </div>
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
        </div>
      </PartialOrderPage>
    </Fragment>
  );
};

export default OrderSummaryPart;
