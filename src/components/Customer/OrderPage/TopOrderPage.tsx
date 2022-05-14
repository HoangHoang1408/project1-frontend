import React, { FC } from "react";
interface Props {
  restaurantName: string;
}
const TopOrderPage: FC<Props> = ({ restaurantName }) => {
  return (
    <div className="w-full bg-white flex justify-center py-6 px-4 shadow">
      <div className="font-bold text-slate-700 w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl mb-2 text-green-500">
          Last step - Payment
        </h1>
        <h1 className="text-xl md:text-2xl">{restaurantName}</h1>
      </div>
    </div>
  );
};

export default TopOrderPage;
