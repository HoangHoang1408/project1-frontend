import React from "react";
import Notification from "../../../page/something/Notification";

const OrderPageNotification = () => {
  return (
    <Notification>
      <div className="flex flex-col space-y-3">
        <h1 className="text-4xl font-bold text-green-500">
          Location not found
        </h1>
        <h1 className="text-xl font-semibold text-slate-700">
          Please enable the location for further service!
        </h1>
      </div>
    </Notification>
  );
};

export default OrderPageNotification;
