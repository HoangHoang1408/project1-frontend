import { faInfo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CartItem, removeItemFromCart } from "../../../apollo/reactiveVar/cart";
import { dishImage } from "../../../images";
interface Props {
  cartItem: CartItem;
  price: number;
  onItemClick?: () => void;
  canClickEdit?: boolean;
}
const ItemInCart: FC<Props> = ({
  cartItem,
  price,
  onItemClick,
  canClickEdit = true,
}) => {
  const { dish, quantity, requirement, choosenOptions } = cartItem;
  // handling funcs
  return (
    <div className="grid grid-cols-12 gap-x-2 place-items-center border-2 border-transparent hover:border-green-500 rounded shadow-md px-1 py-1 transition w-full cursor-pointer relative">
      {canClickEdit && (
        <div
          onClick={() => removeItemFromCart(+dish.id)}
          className="w-fit absolute right-2 top-[0.2rem] z-10"
        >
          <FontAwesomeIcon
            className="text-slate-600 hover:text-red-500 text-lg"
            icon={faTimes}
          />
        </div>
      )}
      <LazyLoadImage
        className="col-span-3 h-20 aspect-auto object-cover bg-center rounded"
        src={dishImage}
      />
      <div className="col-span-7 justify-self-start flex flex-col">
        <div className="flex space-x-2 items-center">
          <h1 className="font-bold text-green-600">{dish.name}</h1>
          <div className="col-span-1 flex space-x-2 items-center text-sm">
            <FontAwesomeIcon className="text-green-600" icon={faTimes} />
            <h1 className="text-slate-600 font-bold">{quantity}</h1>
          </div>
          {canClickEdit && (
            <h1 onClick={onItemClick} className="text-xs text-slate-600">
              (Click to edit)
            </h1>
          )}
        </div>
        <div className="flex items-center space-x-2 w-full">
          <FontAwesomeIcon className="text-xs text-green-600" icon={faInfo} />
          <div className="px-1">
            <div className="rounded flex-grow mb-[0.1rem]">
              <h1 className="text-slate-700 text-xs w-full">
                {requirement || "No additional requirement"}
              </h1>
            </div>
            <div className="flex flex-wrap text-slate-700 text-xs w-full">
              {(!choosenOptions || choosenOptions.length === 0) && (
                <span className="bg-slate-200 px-[0.15rem] mr-[0.2rem] mb-[0.2rem] rounded">
                  No option
                </span>
              )}
              {choosenOptions &&
                choosenOptions.length > 0 &&
                choosenOptions.map(({ optionName }, i) => {
                  return (
                    <span
                      className="bg-slate-200 px-[0.15rem] mr-[0.2rem] mb-[0.2rem] rounded"
                      key={i}
                    >
                      {optionName}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <h1 className="text-center text-sm sm:text-base text-green-600 font-bold">
          {price}$
        </h1>
      </div>
    </div>
  );
};

export default ItemInCart;
