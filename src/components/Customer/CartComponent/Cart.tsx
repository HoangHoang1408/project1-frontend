import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Restaurant_QUERY } from "../../../apollo/query/restaurantQuery";
import { cartVar, ChoosenOption } from "../../../apollo/reactiveVar/cart";
import {
  RestaurantQuery,
  RestaurantQueryVariables,
  RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes,
} from "../../../__generated__/RestaurantQuery";
import Modal from "../../layout/Modal";
import CheckCartItem from "./CheckCartItem";
import ItemInCart from "./ItemInCart";

interface EditingCartItemProps {
  quantity: number;
  requirement: string;
  restaurantId: number;
  dish: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes;
  choosenOptions: ChoosenOption[];
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Cart: FC<Props> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const cart = useReactiveVar(cartVar);
  const [openCheckCartItem, setOpenCheckCartItem] = useState(false);
  const [editingCartItemProps, setEditingCartItemProps] = useState<
    EditingCartItemProps | undefined
  >(undefined);
  const [getRestaurant, { data }] = useLazyQuery<
    RestaurantQuery,
    RestaurantQueryVariables
  >(Restaurant_QUERY, {
    onCompleted(data) {
      if (data.getRestaurant.error)
        toast.error(data.getRestaurant.error.message);
    },
    onError() {
      console.log("Load restaurant in cart failed");
    },
  });
  useEffect(() => {
    if (cart?.restaurantId)
      getRestaurant({
        variables: {
          input: {
            restaurantId: `${cart.restaurantId}`,
          },
        },
      });
  }, [cart?.restaurantId, getRestaurant]);
  if (!cart)
    return (
      <Modal open={open} setOpenModal={setOpen}>
        <div className="w-full h-full grid place-items-center">
          <div className="flex flex-col space-y-3 text-center">
            <h1 className="font-bold text-green-500 text-2xl">
              Start Picking Food!
            </h1>
            <h1 className="text-slate-700 font-semibold">
              Add item to your cart and grab order here
            </h1>
            <h1
              onClick={() => setOpen(false)}
              className="text-blue-500 font-semibold text-lg cursor-pointer hover:text-blue-600"
            >
              Continue browsing{" "}
              <span>
                <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
              </span>
            </h1>
          </div>
        </div>
      </Modal>
    );
  const { cartItems, restaurantId } = cart;
  return (
    <Fragment>
      {editingCartItemProps && openCheckCartItem && (
        <div className="z-50">
          <CheckCartItem
            open={openCheckCartItem}
            setOpen={setOpenCheckCartItem}
            edit={true}
            {...editingCartItemProps}
          />
        </div>
      )}
      <Modal open={open} setOpenModal={setOpen}>
        <div className="w-full h-full">
          <div className="flex flex-col h-full w-full font-semibold text-slate-800 px-3 space-y-1 pb-1">
            <h1 className="text-center text-2xl font-bold text-green-600">
              Shopping Cart
            </h1>
            <div>
              <h1 className="text-lg text-slate-700">
                {data?.getRestaurant.restaurant?.restaurantName
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ") || "Restaurant Name"}
              </h1>
            </div>
            <div className="flex flex-col text-green-600 h-full w-full">
              <div className="flex flex-col h-[25rem] w-full overflow-y-scroll mb-1 no-scrollbar">
                {cartItems.map((item, i) => {
                  const { choosenOptions, dish, quantity, requirement } = item;
                  return (
                    <ItemInCart
                      cartItem={item}
                      key={i}
                      price={item.totalItemPrice as number}
                      onItemClick={() => {
                        setEditingCartItemProps({
                          choosenOptions: choosenOptions,
                          dish,
                          quantity,
                          requirement,
                          restaurantId,
                        });
                        setOpenCheckCartItem(true);
                      }}
                    />
                  );
                })}
              </div>
              <div className="border-2 pt-1 border-transparent border-t-green-500">
                <h1 className="text-xl text-slate-600 font-semibold">
                  Total:{" "}
                  <span className="font-bold text-green-600">
                    {cart.totalPrice}$
                  </span>
                </h1>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/process-order");
                }}
                className="text-center text-lg text-white font-bold hover:bg-green-600 bg-green-500 py-2 px-3 transition rounded mt-2"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Cart;
