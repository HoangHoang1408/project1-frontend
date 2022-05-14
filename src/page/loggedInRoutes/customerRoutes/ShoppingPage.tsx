import { useQuery, useReactiveVar } from "@apollo/client";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getUserLocation, locationVar } from "../../../apollo/reactiveVar/location";
import CommonRestaurants from "../../../components/Customer/ShoppingPage/CommonRestaurants";
import CommonRetaurantCategories from "../../../components/Customer/ShoppingPage/CommonRetaurantCategories";
import { SHOPING_PAGE_QUERY } from "../../../apollo/query/shoppingPageQuery";
import { mainImage } from "../../../images";
import { ShopingPageQuery } from "../../../__generated__/ShopingPageQuery";

const ShoppingPage = () => {
  const location = useReactiveVar(locationVar);
  const [address, setAddress] = useState("");
  useEffect(() => {
    getUserLocation();
  }, []);
  useEffect(() => {
    if (!location || !location.address) return;
    setAddress(location.address);
  }, [location]);
  const { data, loading } = useQuery<ShopingPageQuery>(SHOPING_PAGE_QUERY, {
    onCompleted({
      topRestaurants: { error: error1 },
      topRestaurantCategories: { error: error2 },
    }) {
      if (error1) console.log(error1.message);
      if (error2) console.log(error2.message);
    },
    onError() {
      console.log("Can not load top restaurants");
    },
  });
  return (
    <div className="min-h-screen flex flex-col items-center w-full pb-5">
      {/* hero image */}
      <div className="w-full relative h-80">
        <LazyLoadImage
          className="absolute top-0 left-0 object-cover bg-center w-full h-full -z-10"
          src={mainImage}
        />
        <div className="bg-transparent grid w-2/3 sm:w-1/2 lg:w-[30%] h-full place-items-center text-slate-700 font-semibold mx-4 sm:mx-8 shadow">
          <div className="bg-white w-full px-6 py-7 flex flex-col space-y-2 sm:space-y-4 rounded">
            <h1 className="text-xl sm:text-2xl text-green-600">Good Evening</h1>
            <h1 className="text-2xl sm:text-3xl">
              Let's explore good food near you
            </h1>
            <div className="border border-green-600 hover:border-green-600 rounded flex w-full space-x-2 px-2 py-1">
              <input
                placeholder="Your location"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-sm sm:text-base border-none outline-none text-green-600 font-semibold"
              />
              <div
                onClick={() => getUserLocation()}
                className="w-8 h-8 grid place-items-center cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faSearchLocation}
                  className="text-2xl transition text-green-600 hover:text-green-700"
                />
              </div>
            </div>
            <button className="flex space-x-2 items-center justify-center bg-green-500 px-2 py-2 rounded font-semibold text-white w-full hover:bg-green-600 transition">
              <h1 className="text-xl font-semibold">Search</h1>
            </button>
          </div>
        </div>
      </div>
      {/* contents */}
      <div className="w-full px-1 sm:px-0 max-w-screen-xl flex flex-col text-slate-900 space-y-5 sm:space-y-6 md:space-y-7 pt-10 font-semibold">
        <CommonRestaurants
          loading={loading}
          restaurants={data?.topRestaurants?.restaurants}
        />
        <CommonRetaurantCategories
          loading={loading}
          categories={data?.topRestaurantCategories.restaurantCategories}
        />
      </div>
    </div>
  );
};

export default ShoppingPage;
