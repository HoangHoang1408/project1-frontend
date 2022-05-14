import React, { FC } from "react";
import { loadingWhite } from "../../../images";
interface Props {
  loading: boolean;
  onClick: () => void;
}
const LoadingButton: FC<Props> = ({ loading, onClick, children }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="min-h-[2.8rem] min-w-[7.5rem] rounded grid place-items-center text-white font-semibold overflow-hidden"
    >
      {!loading && children}
      {loading && (
        <div className="h-full w-full bg-slate-300 px-3 flex items-center justify-center">
          <img className="w-10 h-10" src={loadingWhite} alt="Loading" />
        </div>
      )}
    </button>
  );
};

export default LoadingButton;
