import { faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import {
  addItemToCart,
  ChoosenOption,
  editItemInCart,
} from "../../../apollo/reactiveVar/cart";
import { dishImage as defaultDishImage } from "../../../images";
import { calculateParticularOrderItemPrice } from "../../../utils/calculateParticularOrderItemPrice";
import { RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes } from "../../../__generated__/RestaurantQuery";
import Modal from "../../layout/Modal";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  requirement: string;
  quantity: number;
  dish: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes;
  restaurantId: number;
  choosenOptions?: ChoosenOption[];
  className?: string;
  edit?: boolean;
}

const CheckCartItem: FC<Props> = ({
  quantity,
  requirement,
  open,
  setOpen,
  dish,
  restaurantId,
  edit,
  choosenOptions,
}) => {
  const {
    averageRating,
    description,
    price,
    dishOptions,
    name: dishName,
  } = dish;
  const [curQuantity, setCurQuantity] = useState(quantity);
  const [curRequirement, setCurRequirement] = useState(requirement || "");
  const [choosenOptions2, setChoosenOptions2] = useState<ChoosenOption[]>(
    choosenOptions || []
  );
  const [totalPrice, setTotalPrice] = useState(+price * +quantity);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTotalPrice(
      calculateParticularOrderItemPrice(choosenOptions2, dish, curQuantity)
    );
  }, [curQuantity, choosenOptions2, dish]);
  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  // handle funcs
  const handleClickAddItemToCart = () => {
    if (edit) {
      editItemInCart({
        choosenOptions: choosenOptions2,
        dish,
        quantity: curQuantity,
        requirement: curRequirement,
      });
    } else {
      addItemToCart(
        {
          choosenOptions: choosenOptions2,
          dish,
          quantity: curQuantity,
          requirement: curRequirement,
        },
        restaurantId
      );
    }
    toast.success(`${edit ? "Updated" : "Added to cart!"}`, {
      autoClose: 1500,
    });
    setOpen(false);
  };
  return (
    <Modal open={open} setOpenModal={setOpen}>
      <div className="flex flex-col space-y-3 -mt-2 justify-between items-center text-green-500 font font-semibold h-full px-3">
        <h1 className="text-2xl font-bold text-center sm:mb-2">Order Item</h1>
        <div className="grid grid-cols-12 gap-x-3 w-full">
          <div className="col-span-12 sm:col-span-5 place-self-center">
            <LazyLoadImage
              className="h-24 sm:h-48 aspect-square rounded"
              src={
                defaultDishImage || dish.dishImage?.imageUrl || defaultDishImage
              }
            />
          </div>
          <div className="col-span-12 sm:col-span-7 flex flex-col sm:space-y-2">
            <h1 className="font-bold text-xl text-slate-700">
              {dishName}{" "}
              {averageRating && (
                <span className="text-sm font-semibold">
                  ({averageRating}{" "}
                  <FontAwesomeIcon className="text-yellow-500" icon={faStar} />)
                </span>
              )}
              {!averageRating && (
                <span className="text-sm font-semibold">(Not rated)</span>
              )}
            </h1>
            <div className="pl-2 flex flex-col sm:space-y-1">
              <h1>
                Price: <span className="text-slate-500">{price}$</span>
              </h1>
              <div>
                <h1>Quantity</h1>
                <div className="flex space-x-5 items-center text-lg px-1">
                  <FontAwesomeIcon
                    className="cursor-pointer transform transition hover:scale-110 hover:text-green-700"
                    icon={faMinus}
                    onClick={() => {
                      if (curQuantity <= 1) return;
                      setCurQuantity((pre) => pre - 1);
                    }}
                  />
                  <h1 className="text-slate-500">{curQuantity}</h1>
                  <FontAwesomeIcon
                    className="cursor-pointer transform transition hover:scale-110 hover:text-green-700"
                    icon={faPlus}
                    onClick={() => {
                      setCurQuantity((pre) => pre + 1);
                    }}
                  />
                </div>
              </div>
              <div>
                <h1 className="font-semibold">Description</h1>
                <p className="text-slate-500 font-semibold px-1">
                  {description}
                </p>
              </div>
              <div>
                <h1>Dish Options</h1>
                {(!dishOptions || dishOptions.length === 0) && (
                  <h1 className="px-1 text-slate-500">
                    This dish has no option
                  </h1>
                )}
                {dishOptions && (
                  <div className="px-1">
                    {dishOptions.map(({ options, typeName }, i) => {
                      return (
                        <div className="grid grid-cols-3" key={i}>
                          <h1 className="col-span-1">{typeName}</h1>
                          <select
                            onChange={(e) => {
                              setChoosenOptions2((pre) => {
                                const index = pre.findIndex(
                                  (e) => e.typeName === typeName
                                );
                                if (index !== -1) pre.splice(index, 1);
                                return [
                                  ...pre,
                                  {
                                    typeName: typeName,
                                    optionName: e.target.value,
                                  },
                                ];
                              });
                            }}
                            className="col-span-2 border-none outline-none text-slate-500"
                            defaultValue={
                              choosenOptions?.find(
                                (option) => option.typeName === typeName
                              )?.optionName
                            }
                          >
                            <option value={"unselected"}>
                              Unselected (+${0})
                            </option>
                            {options.map(({ extraPrice, optionName }, t) => (
                              <option value={optionName} key={t}>
                                {optionName[0].toUpperCase() +
                                  optionName.slice(1)}{" "}
                                (+${extraPrice})
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="">
                <h1 onClick={() => setEditing(true)} className="cursor-pointer">
                  Additional Requirement
                  <span className="text-xs text-slate-500">
                    {" "}
                    (Click to edit)
                  </span>
                </h1>
                {!editing && (
                  <div className="cursor-pointer hover:bg-gray-300 py-1 px-1 rounded flex-grow transition text-sm">
                    <h1
                      onClick={() => setEditing(true)}
                      className="text-slate-500 w-full"
                    >
                      {curRequirement && curRequirement.length > 0
                        ? curRequirement
                        : "Click to add requirement"}
                    </h1>
                  </div>
                )}
                {editing && (
                  <input
                    ref={ref}
                    onBlur={() => setEditing(false)}
                    className="border-none flex-grow outline-none text-slate-500 py-1 px-1 font-semibold text-sm w-full"
                    onChange={(e) => {
                      const textInput = e.target.value;
                      return setCurRequirement(textInput);
                    }}
                    value={curRequirement}
                  />
                )}
              </div>
              <h1 className="text-lg font-bold">
                Total price:{" "}
                <span className="text-slate-500">{totalPrice}$</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="h-full"></div>
        <button
          onClick={handleClickAddItemToCart}
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-sm transition hover:bg-green-600 text-lg"
        >
          {edit ? "Update" : "Add to cart"}
        </button>
      </div>
    </Modal>
  );
};

export default CheckCartItem;
