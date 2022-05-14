import { useReactiveVar } from "@apollo/client";
import lodash from "lodash";
import { FC } from "react";
import { userObjectVar } from "../../../apollo/reactiveVar/loginStatus";
import { GetOrderDetailQuery_getOrder_order } from "../../../__generated__/GetOrderDetailQuery";
interface OrderInterface {
  order: GetOrderDetailQuery_getOrder_order;
}
export const OrderInfo: FC<OrderInterface> = ({ order }) => {
  const user = useReactiveVar(userObjectVar);
  const {
    createdAt,
    orderCode,
    deliveryAddress,
    addressDetail,
    method,
    deliveryNote,
    driver,
    restaurant,
    orderStatus,
  } = order;
  const info: { label: string; info?: string | null }[] = [
    {
      label: "Order status:",
      info: lodash.startCase(orderStatus),
    },
    {
      label: "Order code:",
      info: orderCode,
    },
    {
      label: "Order date:",
      info: new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }),
    },
    {
      label: "Customer",
      info: user ? user.name[0].toUpperCase() + user.name.slice(1) : null,
    },
    {
      label: "Delivery address:",
      info: deliveryAddress,
    },
    {
      label: "Detail address:",
      info: addressDetail,
    },
    {
      label: "Delivery note:",
      info: deliveryNote,
    },
    {
      label: "Payment method:",
      info: method,
    },
    {
      label: "Restaurant:",
      info: restaurant?.restaurantName,
    },
  ];
  return (
    <div className="w-full flex flex-col text-slate-600">
      <h1 className="text-green-500 font-bold text-xl mb-2">Order Info</h1>
      <div className="w-full flex flex-col px-2 space-y-1">
        {info.map(({ info, label }, i) => {
          return (
            <div
              key={i}
              className="flex flex-col sm:flex-row space-x-2 flex-wrap font-semibold"
            >
              <h1 className="w-36 text-green-600">{label}</h1>
              <h1 className="text-sm sm:text-base">
                {info ? info : "Not set"}
              </h1>
            </div>
          );
        })}
        <div className="flex flex-col sm:flex-row space-x-2 flex-wrap font-semibold">
          <h1 className="text-green-600 w-36">{"Driver:"}</h1>
          {!driver && <h1 className="text-sm sm:text-base ">Not set</h1>}
          {driver && (
            <div>
              <h1 className="text-sm sm:text-base">{driver.name}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
