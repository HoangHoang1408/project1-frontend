import React from "react";
import { PartialOrderPage } from "./PartialOrderPage";

const PromotionPart = () => {
  return (
    <PartialOrderPage headerName="Promotion">
      <div className="grid grid-cols-12 gap-x-6">
        <input
          type="text"
          className="col-span-8 outline-none py-2 px-2 border border-slate-300 hover:border-green-500 focus:border-green-500 rounded w-full text-sm font-semibold"
        />
        <div className="col-span-4">
          <button className="px-3 py-2 font-semibold text-white bg-green-500  hover:bg-green-600 rounded">
            Apply
          </button>
        </div>
      </div>
    </PartialOrderPage>
  );
};

export default PromotionPart;
