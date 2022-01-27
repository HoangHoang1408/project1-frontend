import { faInfo, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dishImage } from "../../../images";

const CartItem = () => {
  return (
    <div
      className="grid grid-cols-12 gap-x-3 place-items-center border-2 border-transparent hover:border-green-500
          rounded shadow-md px-1 py-2 transition"
    >
      <div className="col-span-3 rounded overflow-hidden  border-red-600">
        <LazyLoadImage
          className="w-full h-28 object-cover bg-center"
          src={dishImage}
        />
      </div>
      <div className="col-span-7 flex flex-col space-y-2">
        <h1 className="text-lg font-bold">Dish name</h1>
        <div className="col-span-1 flex space-x-3 items-center">
          <FontAwesomeIcon
            className="cursor-pointer transform transition hover:scale-110 hover:text-green-700"
            icon={faMinus}
          />
          <h1 className="text-lg text-slate-800">1</h1>
          <FontAwesomeIcon
            className="cursor-pointer transform transition hover:scale-110 hover:text-green-700"
            icon={faPlus}
          />
        </div>
        <h1 className="flex items-center space-x-3">
          <FontAwesomeIcon className="text-xs" icon={faInfo} />
          <h1 className="text-slate-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
            voluptas? Fuga, voluptates.
          </h1>
          <button className="px-2 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600 text-xs">
            Edit
          </button>
        </h1>
      </div>
      <div className="col-span-2 grid">
        <h1 className="text-xl text-center">{2.99}$</h1>
      </div>
    </div>
  );
};

export default CartItem;
