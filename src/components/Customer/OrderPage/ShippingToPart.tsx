import { useReactiveVar } from "@apollo/client";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRouteInfos,
  getUserLocation,
  locationVar,
} from "../../../apollo/reactiveVar/location";
import OrderMap from "../../map/OrderMap";
import {
  OrderPageTextInput,
  OrderPageTextInputProps,
} from "./OrderPageTextInput";
import { PartialOrderPage } from "./PartialOrderPage";
export interface RouteInfos {
  distance: number;
  duration: number;
}

interface Props {
  restaurantCoordinates: {
    latitude: number;
    longtitude: number;
  };
  formInputs: OrderPageTextInputProps[];
  routeInfos: RouteInfos | null;
  setRouteInfos: Dispatch<SetStateAction<RouteInfos | null>>;
}
const ShippingToPart: FC<Props> = ({
  restaurantCoordinates,
  routeInfos,
  setRouteInfos,
  formInputs,
}) => {
  const navigate = useNavigate();
  const location = useReactiveVar(locationVar);
  useEffect(() => {
    if (!location) getUserLocation();
    if (!routeInfos && location) {
      const { latitude: lat, longtitude: lng } = restaurantCoordinates;
      getRouteInfos([
        { lat, lng },
        { lat: location.lat, lng: location.lng },
      ]).then((data) => {
        const { distance, duration } = data.routes[0];
        setRouteInfos({
          distance,
          duration,
        });
      });
    }
  }, [navigate, routeInfos, location, restaurantCoordinates, setRouteInfos]);
  return (
    <PartialOrderPage headerName={"Shipping To"}>
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-5">
            {location && <OrderMap lat={location.lat} lng={location.lng} />}
          </div>
          <div className="col-span-7 text-sm flex flex-col space-y-3">
            {formInputs.map((prop, i) => (
              <OrderPageTextInput key={i} {...prop} />
            ))}
          </div>
        </div>
        {routeInfos && (
          <div className="flex font-semibold space-x-3">
            <h1 className="text-slate-800">Delivery arival time:</h1>
            <h1 className="text-green-600 font-bold">
              {Math.round(routeInfos.duration / 60)} min,{" "}
              {Math.round(routeInfos.distance / 10) / 100} km away
            </h1>
          </div>
        )}
      </div>
    </PartialOrderPage>
  );
};

export default ShippingToPart;
