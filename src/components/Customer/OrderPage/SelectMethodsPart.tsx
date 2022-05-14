import { faMoneyBill, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  OrderPageSelectInput,
  OrderPageSelectInputProps,
} from "./OrderPageSelectInput";
import { PartialOrderPage } from "./PartialOrderPage";
const selectInputProps: OrderPageSelectInputProps[] = [
  {
    labelText: "Payment method",
    options: [
      {
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
        text: "By Cash",
      },
    ],
  },
  {
    labelText: "Profile",
    options: [
      {
        icon: <FontAwesomeIcon icon={faUser} />,
        text: "Personal",
      },
    ],
  },
];
const SelectMethodsPart = () => {
  return (
    <PartialOrderPage headerName="Detail Payment">
      <div className="text-sm flex flex-col space-y-4">
        {selectInputProps.map((prop, i) => (
          <OrderPageSelectInput key={i} {...prop} />
        ))}
      </div>
    </PartialOrderPage>
  );
};

export default SelectMethodsPart;
