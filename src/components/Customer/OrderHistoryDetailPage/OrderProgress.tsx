import { FC, useState } from "react";

export const OrderStatusProgress: FC = () => {
  const array = [0, 1, 2, 3, 4];
  const [currentStatus, setCurrentStatus] = useState(array[2]);
  return (
    <div className="w-full flex justify-center pb-3 sm:pb-4 md:pb-6">
      <div className="w-full max-w-3xl h-[0.35rem] sm:h-2 bg-slate-200 relative">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between rounded">
          {array.map((e, i) => {
            let color = i <= currentStatus ? "bg-green-500 " : "bg-slate-200 ";
            if (i === currentStatus)
              color = "bg-white border-2 border-green-500 scale-110 ";
            return (
              <div
                key={i}
                className={
                  "w-[0.7rem] h-[0.7rem] sm:w-4 sm:h-4 rounded-full relative z-[5] " +
                  color
                }
              >
                <div className="top-[110%] left-0 absolute w-full flex justify-center text-sm sm:text-base text-slate-600">
                  <h1 className="font-semibold">{e}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between overflow-hidden rounded">
          {[0, 1, 2, 3].map((e, i) => {
            const color =
              i <= currentStatus - 1 ? "bg-green-500" : "bg-slate-200";
            return <div key={i} className={"h-full w-full " + color}></div>;
          })}
        </div>
      </div>
    </div>
  );
};
