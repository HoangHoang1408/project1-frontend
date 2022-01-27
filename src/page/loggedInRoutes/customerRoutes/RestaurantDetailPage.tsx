import { gql, useQuery } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DishGroup from "../../../components/Customer/RestaurantDetailPage/DishGroup";
import DishGroupTitle from "../../../components/Customer/RestaurantDetailPage/DishGroupTitle";
import Loading from "../../../components/main/Loading";
import { FULL_RESTAURANT_FRAGMENT } from "../../../constants/fragment/FullRestaurantFragment";
import { mainImage } from "../../../images";
import {
  RetaurantQuery,
  RetaurantQueryVariables,
} from "../../../__generated__/RetaurantQuery";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  useEffect(() => {}, [restaurantId]);
  const navigate = useNavigate();
  const { loading, data } = useQuery<RetaurantQuery, RetaurantQueryVariables>(
    Restaurant_QUERY,
    {
      variables: {
        input: {
          restaurantId: restaurantId ? +restaurantId : 0,
        },
      },
      onCompleted(data) {
        if (data.getRestaurant.error)
          toast.error(data.getRestaurant.error.message);
      },
      onError() {
        navigate("/notfound", {
          replace: true,
        });
      },
    }
  );
  const restaurant = data?.getRestaurant.restaurant;
  const dishGroups = restaurant?.dishGroups || [];
  const restaurantImage = restaurant?.backgroundImage?.imageUrl;
  const [dishGroupActive, setDishGroupActive] = useState(0);
  if (loading && !data) return <Loading />;
  return (
    <div className="flex flex-col items-center">
      <LazyLoadImage
        src={restaurantImage || mainImage}
        className="object-cover bg-center h-96 w-full"
      />
      <div className="w-full sm:max-w-3xl md:max-w-[52rem] lg:max-w-7xl 2xl:max-w-screen-2xl mx-2 lg:mx-0 -mt-44 bg-white py-6 px-4 md:px-7 rounded flex flex-col space-y-3 font-normal">
        <h1 className="text-4xl text-left font-bold text-slate-700">
          {restaurant?.restaurantName || ""}
        </h1>
        <div className="text-slate-600">
          <h4>
            {restaurant?.categories
              ?.map((v) => {
                return v.name
                  .split(" ")
                  .map((v) => v[0].toUpperCase() + v.slice(1))
                  .join(" ");
              })
              .join(", ") || "Category"}{" "}
          </h4>
          <h4>
            Ratings:{" "}
            <FontAwesomeIcon className="text-yellow-500" icon={faStar} />{" "}
            {restaurant?.rating || 5}
          </h4>
          <div className="flex space-x-4">
            {restaurant?.openTime && (
              <h4>
                Open Time:{" "}
                {new Date(restaurant.openTime).toLocaleString("en-US", {
                  hour: "2-digit",
                })}
              </h4>
            )}
            {restaurant?.closeTime && (
              <h4>
                Close Time:{" "}
                {new Date(restaurant.closeTime).toLocaleString("en-US", {
                  hour: "2-digit",
                })}
              </h4>
            )}
          </div>
        </div>
        {/* dish group title */}
        <DishGroupTitle
          dishGroupActive={dishGroupActive}
          dishGroups={dishGroups}
          setDishGroupActive={setDishGroupActive}
        />
        {/* dish */}
        <div className="flex flex-col pt-4 space-y-12">
          {dishGroups.map((group, i) => {
            return (
              <DishGroup
                key={i}
                dishGroup={group}
                dishGroupNumber={i}
                dishGroupActive={dishGroupActive}
                setDishGroupActive={setDishGroupActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Restaurant_QUERY = gql`
  ${FULL_RESTAURANT_FRAGMENT}
  query RetaurantQuery($input: GetRestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error {
        field
        message
      }
      restaurant {
        ...FullRestaurant
      }
    }
  }
`;

export default RestaurantDetail;
