import { loadingBlack } from "../../images";

function Loading() {
  return (
    <div className="w-full h-full grid place-items-center">
      <img src={loadingBlack} alt="loading" />
    </div>
  );
}

export default Loading;
