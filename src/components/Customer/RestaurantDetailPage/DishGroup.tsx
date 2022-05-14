import { useReactiveVar } from "@apollo/client";
import {
  faCartArrowDown,
  faInfo,
  faPlus,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { cartVar } from "../../../apollo/reactiveVar/cart";
import { dishImage } from "../../../images";
import {
  RestaurantQuery_getRestaurant_restaurant_dishGroups,
  RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes,
} from "../../../__generated__/RestaurantQuery";

interface Props {
  dishGroupActive: number;
  dishGroupNumber: number;
  dishGroup: RestaurantQuery_getRestaurant_restaurant_dishGroups;
  setDishGroupActive: Dispatch<SetStateAction<number>>;
  setAddedDish: Dispatch<
    SetStateAction<RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes | null>
  >;
  setOpenCheckCartItem: Dispatch<SetStateAction<boolean>>;
  setOpenAddNewCartItemConfirmModal: Dispatch<SetStateAction<boolean>>;
  setOpenAddDishOfNewRestaurantConfirmModal: Dispatch<SetStateAction<boolean>>;
  restaurantId: number;
}

const DishGroup: FC<Props> = ({
  dishGroupActive,
  dishGroupNumber,
  setDishGroupActive,
  dishGroup,
  restaurantId,
  setAddedDish,
  setOpenCheckCartItem,
  setOpenAddNewCartItemConfirmModal,
  setOpenAddDishOfNewRestaurantConfirmModal,
}) => {
  const navigate = useNavigate();
  const cart = useReactiveVar(cartVar);
  const inCartIds = cart?.cartItems.map((item) => ({
    id: +item.dish.id,
    quantity: item.quantity,
  }));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dishGroupActive === 0)
      return window.scrollTo({
        top: 100,
      });
    if (dishGroupActive === dishGroupNumber)
      return ref.current?.scrollIntoView();
  }, [dishGroupActive, dishGroupNumber]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (ref.current) {
        const offsetTopFromTop = ref.current.offsetTop;
        const scrollY = window.scrollY;

        if (
          offsetTopFromTop - 50 - 100 < scrollY &&
          scrollY < offsetTopFromTop + 50 + 100
        )
          setDishGroupActive(dishGroupNumber);
      }
    });
  }, [dishGroupNumber, setDishGroupActive]);

  return (
    <Fragment>
      <div ref={ref} className="scroll-mt-28 space-y-6 select-none ">
        <h1 className="text-3xl font-semibold text-slate-700">
          {dishGroup.dishGroupName}
        </h1>
        <div className="grid grid-cols-12 gap-5">
          {dishGroup.dishes?.map((dish, i) => {
            const quantity = inCartIds?.find(
              (inCart) => inCart.id === +dish.id
            )?.quantity;
            return (
              <div
                key={i}
                className="p-2 rounded overflow-hidden col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 gap-3 border-2 border-transparent hover:border-green-500 cursor-pointer transition "
              >
                <LazyLoadImage
                  className="col-span-5 w-full h-36 rounded object-cover bg-center"
                  src={dish.dishImage?.imageUrl && dishImage}
                />
                <div className="col-span-7 flex flex-col justify-between space-y-3">
                  <div>
                    <h1 className="text-slate-700 font-semibold text-lg">
                      {dish.name}{" "}
                      {dish.averageRating && (
                        <span className="text-xs text-slate-500">
                          {dish.averageRating}{" "}
                          <FontAwesomeIcon
                            className="text-yellow-500"
                            icon={faStar}
                          />
                        </span>
                      )}
                      {!dish.averageRating && (
                        <span className="text-xs text-slate-500">
                          Not rated
                        </span>
                      )}
                    </h1>
                    <div className="text-sm text-slate-500">
                      {dish.description}
                    </div>
                    {quantity && (
                      <div className="top-4 right-3 flex items-center space-x-1 font-semibold text-slate-500">
                        <FontAwesomeIcon
                          className="text-sm text-green-500"
                          icon={faCartArrowDown}
                        />
                        <FontAwesomeIcon
                          className="text-sm text-green-500"
                          icon={faTimes}
                        />
                        <h1>{quantity}</h1>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-white space-x-2">
                    <h1 className="text-slate-700 text-lg font-bold">
                      {dish.price}$
                    </h1>
                    <div className="flex space-x-2 text-xl">
                      <div
                        onClick={() => navigate(`/dishes/${dish.slug}`)}
                        className="text-right w-8 h-8 bg-blue-500 grid place-items-center hover:bg-blue-600 cursor-pointer rounded"
                      >
                        <FontAwesomeIcon icon={faInfo} />
                      </div>
                      <div
                        onClick={() => {
                          setAddedDish(dish);
                          if (cart && cart.restaurantId !== restaurantId)
                            return setOpenAddDishOfNewRestaurantConfirmModal(
                              true
                            );
                          if (quantity)
                            return setOpenAddNewCartItemConfirmModal(true);
                          setOpenCheckCartItem(true);
                        }}
                        className="text-right w-8 h-8 bg-green-500 grid place-items-center  hover:bg-green-600 cursor-pointer rounded"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default DishGroup;
