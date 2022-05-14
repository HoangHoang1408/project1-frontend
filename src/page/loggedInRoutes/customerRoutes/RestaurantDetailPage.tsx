import { useQuery } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CheckCartItem from "../../../components/Customer/CartComponent/CheckCartItem";
import DishGroup from "../../../components/Customer/RestaurantDetailPage/DishGroup";
import DishGroupTitle from "../../../components/Customer/RestaurantDetailPage/DishGroupTitle";
import ConfirmModal from "../../../components/layout/ConfirmModal";
import Loading from "../../../components/layout/Loading";
import { Restaurant_QUERY } from "../../../apollo/query/restaurantQuery";
import { mainImage } from "../../../images";
import {
  RestaurantQuery,
  RestaurantQueryVariables,
  RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes,
} from "../../../__generated__/RestaurantQuery";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!restaurantId || restaurantId === "") {
  //     navigate("/", {
  //       replace: true,
  //     });
  //   }
  // }, [restaurantId, navigate]);

  // main query
  const { loading, data } = useQuery<RestaurantQuery, RestaurantQueryVariables>(
    Restaurant_QUERY,
    {
      variables: {
        input: {
          restaurantId: restaurantId ? restaurantId : "0",
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

  // states
  const [openCheckCartItem, setOpenCheckCartItem] = useState(false);
  const [openAddNewCartItemConfirmModal, setOpenAddNewCartItemConfirmModal] =
    useState(false);
  const [confirmAddNewCartItem, setConfirmAddNewCartItem] = useState<
    boolean | null
  >(null);
  const [
    openAddDishOfNewRestaurantConfirmModal,
    setOpenAddDishOfNewRestaurantConfirmModal,
  ] = useState(false);
  const [confirmAddDishOfNewRestaurant, setConfirmAddDishOfNewRestaurant] =
    useState<boolean | null>(null);
  const [addedDish, setAddedDish] =
    useState<RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes | null>(
      null
    );

  // effects for add a new item
  useEffect(() => {
    if (confirmAddNewCartItem || confirmAddDishOfNewRestaurant)
      setOpenCheckCartItem(true);
    setConfirmAddNewCartItem(null);
    setConfirmAddDishOfNewRestaurant(null);
  }, [confirmAddNewCartItem, confirmAddDishOfNewRestaurant]);

  // extract data from restaurant
  const restaurant = data?.getRestaurant.restaurant;
  const dishGroups = restaurant?.dishGroups || [];
  const restaurantImage = restaurant?.backgroundImage?.imageUrl;
  const [dishGroupActive, setDishGroupActive] = useState(0);
  if (loading && !data) return <Loading />;
  return (
    <Fragment>
      {/* confirm to add dish of new restaurant (will delete all dishes of old one) */}
      <ConfirmModal
        openConfirmModal={openAddDishOfNewRestaurantConfirmModal}
        setOpenConfirmModal={setOpenAddDishOfNewRestaurantConfirmModal}
        setConfirm={setConfirmAddDishOfNewRestaurant}
        closeButtonText="Close"
        continueButtonText="Continue"
      >
        <h1 className="text-green-600 text-2xl sm:text-3xl font-bold">
          Start New Cart?
        </h1>
        <div className="text-center text-sm sm:text-base">
          <h1>
            Currently we do not support order from different restaurants. Add
            this item will clear your cart.
          </h1>
          <h1 className="text-blue-500">Do you wish to continue?</h1>
        </div>
      </ConfirmModal>
      {/* confirm to add new dish with other options */}
      <ConfirmModal
        openConfirmModal={openAddNewCartItemConfirmModal}
        setOpenConfirmModal={setOpenAddNewCartItemConfirmModal}
        setConfirm={setConfirmAddNewCartItem}
        closeButtonText="Close"
        continueButtonText="Continue"
      >
        <h1 className="text-green-600 text-2xl sm:text-3xl font-bold">
          Item is already in cart!
        </h1>
        <div className="text-center text-sm sm:text-base">
          <h1>Do you want to add another options with this item?</h1>
          <h1>
            If not just update your item in cart or the item will be
            accumulated.
          </h1>
        </div>
      </ConfirmModal>
      {openCheckCartItem && addedDish && (
        <CheckCartItem
          open={openCheckCartItem}
          setOpen={setOpenCheckCartItem}
          quantity={1}
          requirement={""}
          dish={addedDish}
          restaurantId={+(restaurantId as string)}
        />
      )}
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
          <div className="flex flex-col pt-4 space-y-10">
            {dishGroups.map((group, i) => {
              return (
                <DishGroup
                  key={i}
                  dishGroup={group}
                  dishGroupNumber={i}
                  dishGroupActive={dishGroupActive}
                  restaurantId={+(restaurant?.id as string)}
                  setDishGroupActive={setDishGroupActive}
                  setAddedDish={setAddedDish}
                  setOpenCheckCartItem={setOpenCheckCartItem}
                  setOpenAddNewCartItemConfirmModal={
                    setOpenAddNewCartItemConfirmModal
                  }
                  setOpenAddDishOfNewRestaurantConfirmModal={
                    setOpenAddDishOfNewRestaurantConfirmModal
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RestaurantDetail;
