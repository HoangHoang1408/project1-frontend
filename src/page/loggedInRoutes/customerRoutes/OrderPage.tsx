import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CREATE_ORDER_MUTATION } from "../../../apollo/query/createOrderMutation";
import { Restaurant_QUERY } from "../../../apollo/query/restaurantQuery";
import { cartVar } from "../../../apollo/reactiveVar/cart";
import { locationVar } from "../../../apollo/reactiveVar/location";
import OrderActionPart from "../../../components/Customer/OrderPage/OrderActionPart";
import OrderPageNotification from "../../../components/Customer/OrderPage/OrderPageNotification";
import { OrderPageTextInputProps } from "../../../components/Customer/OrderPage/OrderPageTextInput";
import OrderSummaryPart from "../../../components/Customer/OrderPage/OrderSummaryPart";
import PromotionPart from "../../../components/Customer/OrderPage/PromotionPart";
import SelectMethodsPart from "../../../components/Customer/OrderPage/SelectMethodsPart";
import ShippingToPart, {
  RouteInfos,
} from "../../../components/Customer/OrderPage/ShippingToPart";
import TopOrderPage from "../../../components/Customer/OrderPage/TopOrderPage";
import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
} from "../../../__generated__/CreateOrderMutation";
import { PaymentMethods } from "../../../__generated__/globalTypes";
import {
  RestaurantQuery,
  RestaurantQueryVariables,
} from "../../../__generated__/RestaurantQuery";
// data
interface Form {
  address: string;
  detailAddress: string;
  notes: string;
}
// main component
const OrderPage = () => {
  const cart = useReactiveVar(cartVar);
  const navigate = useNavigate();
  const location = useReactiveVar(locationVar);
  const [routeInfos, setRouteInfos] = useState<RouteInfos | null>(null);

  // query and mutation
  const [restaurantQuery, { data }] = useLazyQuery<
    RestaurantQuery,
    RestaurantQueryVariables
  >(Restaurant_QUERY, {
    onCompleted(data) {
      if (data.getRestaurant.error)
        toast.error(data.getRestaurant.error.message);
    },
    onError() {
      navigate("/notfound", {
        replace: true,
      });
    },
  });
  const [createOrder, { loading: createOrderLoading }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted: (data) => {
      if (data.createOrder.error?.message)
        return toast.error(
          data.createOrder.error.message + " Please try again later!"
        );
      toast.success("New order created. Thanks you for ordering!");
      cartVar(null);
    },
    onError: () => {
      toast.error("Create new order fail. Please try again later!");
    },
  });

  // effects
  useEffect(() => {
    if (!cart) {
      navigate("/");
      return;
    }
    if (!data) {
      restaurantQuery({
        variables: {
          input: {
            restaurantId: String(cart.restaurantId),
          },
        },
      });
      return;
    }
  }, [cart, navigate, restaurantQuery, data]);

  // form
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Form>({
    mode: "onBlur",
  });
  const textInputProps = useMemo<OrderPageTextInputProps[]>(
    () => [
      {
        id: "address",
        labelText: "Address",
        type: "text",
        placeholder: location?.address || "Your address",
        registerObject: register("address", {
          required: {
            value: true,
            message: "You need to enter your address",
          },
          validate: (v) => v.trim().length > 0 || "Invalid address",
          disabled: Boolean(location?.address),
        }),
        disabled: Boolean(location?.address),
        error: errors.address?.message,
      },
      {
        id: "detailaddress",
        labelText: "Detail address",
        type: "text",
        placeholder: "Ex: floor / apartment name",
        registerObject: register("detailAddress"),
        error: errors.detailAddress?.message,
      },
      {
        id: "notes",
        labelText: "Notes for driver",
        type: "text",
        placeholder: "Ex: see me at the lobby",
        registerObject: register("notes"),
        error: errors.notes?.message,
      },
    ],
    [errors, location, register]
  );

  // create order handler
  function handleClickCreateOrder() {
    if (!location || !cart || !routeInfos)
      return toast.error("Order information is missing. Please check again!");
    createOrder({
      variables: {
        input: {
          addressDetail: getValues().detailAddress,
          deliveryNote: getValues().notes,
          addressCoordinates: {
            latitude: location.lat,
            longtitude: location.lng,
          },
          deliveryAddress: location.address,
          restaurantId: String(cart.restaurantId),
          deliveryTime: new Date(Date.now() + +routeInfos.duration * 1000),
          orderItemsInput: cart.cartItems.map(
            ({ choosenOptions, dish, quantity, requirement }) => ({
              extraRequirement: requirement,
              dishId: dish.id,
              quantity,
              choosenOptions,
            })
          ),
          method: PaymentMethods.ByCash,
        },
      },
    });
  }
  if (!location) return <OrderPageNotification />;
  const restaurant = data?.getRestaurant.restaurant;
  return (
    <Fragment>
      {restaurant && (
        <div className="min-h-screen flex flex-col items-center w-full bg-slate-50 pb-8">
          <TopOrderPage
            restaurantName={restaurant.restaurantName || "Restaurant Name"}
          />
          <div className="w-full flex flex-col items-center pt-4 space-y-4 px-4">
            <ShippingToPart
              restaurantCoordinates={restaurant.coordinates}
              formInputs={textInputProps}
              routeInfos={routeInfos}
              setRouteInfos={setRouteInfos}
            />
            <OrderSummaryPart />
            <SelectMethodsPart />
            <PromotionPart />
            <OrderActionPart
              createOrderLoading={createOrderLoading}
              createOrder={handleClickCreateOrder}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default OrderPage;
