import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, Fragment } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { mainImage } from "../../../images";
import { ShopingPageQuery_topRestaurants_restaurants } from "../../../__generated__/ShopingPageQuery";
import Loading from "../../layout/Loading";

interface Props {
  restaurants: ShopingPageQuery_topRestaurants_restaurants[] | null | undefined;
  loading: boolean;
}

const CommonRestaurants: FC<Props> = ({ restaurants, loading }) => {
  return (
    <Fragment>
      <div className="scroll-smooth">
        <h1 className="text-3xl md:text-4xl font-bold scroll-mt-16">
          Common restaurants
        </h1>
      </div>
      {loading && !restaurants && <Loading></Loading>}
      {!loading && restaurants && (
        <div className="flex flex-col space-y-5 w-full">
          {/* Restaurants container */}
          <ScrollContainer
            vertical={false}
            hideScrollbars={true}
            className="flex w-full"
          >
            {/* cart */}
            {restaurants?.map(
              (
                {
                  restaurantName,
                  backgroundImage,
                  categories,
                  closeTime,
                  id,
                  openTime,
                  rating,
                },
                i
              ) => {
                const imageSrc = backgroundImage?.imageUrl || mainImage;
                const categoryName = categories
                  ?.map((category) =>
                    category.name
                      .split(" ")
                      .map((e) => e[0].toUpperCase() + e.slice(1))
                      .join(" ")
                  )
                  .join(", ");
                return (
                  <div
                    key={id}
                    className="w-1/2 sm:w-4/12 lg:w-3/12 h-full shrink-0 px-2"
                  >
                    <div className="rounded-md cursor-pointer overflow-hidden pb-2">
                      <div className="h-40">
                        <LazyLoadImage
                          src={imageSrc}
                          className="object-cover bg-center w-full h-full"
                        />
                      </div>
                      <div className="text-xl text-slate-700 mt-2">
                        {restaurantName}
                      </div>
                      <div className="text-gray-500 font-normal flex justify-between items-center">
                        <div>
                          <h1 className="">{categoryName}</h1>
                          <div className="flex space-x-4">
                            <h1 className="ml-1">
                              <FontAwesomeIcon
                                className="text-yellow-500"
                                icon={faStar}
                              />{" "}
                              {rating || 5}
                            </h1>
                            {openTime && closeTime && (
                              <h4>
                                {openTime}-{closeTime}
                              </h4>
                            )}
                          </div>
                        </div>
                        <Link to={`/restaurant/${id}`}>
                          <button className="mr-3 bg-green-500 px-2 py-1 rounded text-white font-semibold hover:bg-green-600 transition hover:shadow">
                            Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </ScrollContainer>
          <div className="text-center text mx-2 py-2 border-2 border-slate-600 text-slate-600 rounded font-bold cursor-pointer hover:text-green-600 hover:border-green-600 transition">
            More restaurants
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CommonRestaurants;
