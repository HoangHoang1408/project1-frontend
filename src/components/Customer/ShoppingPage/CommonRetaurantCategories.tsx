import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { mainImage } from "../../../images";
import { ShopingPageQuery_topRestaurantCategories_restaurantCategories } from "../../../__generated__/ShopingPageQuery";
import Loading from "../../layout/Loading";
interface Props {
  categories:
    | ShopingPageQuery_topRestaurantCategories_restaurantCategories[]
    | null
    | undefined;
  loading: boolean;
}
const CommonRetaurantCategories: FC<Props> = ({ categories, loading }) => {
  return (
    <div className="">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-2">
        There's something for everyone!
      </h1>
      {loading && !categories && <Loading></Loading>}
      <div className="grid grid-cols-12 px-2 gap-4">
        {categories?.map((category, i) => {
          const imageSrc = category.coverImage?.imageUrl || mainImage;
          const categoryName = category.name
            .split(" ")
            .map((e) => e[0].toUpperCase() + e.slice(1))
            .join(" ");
          return (
            <Link
              to={`/category/${category.id}`}
              key={i}
              className="col-span-6 sm:col-span-4 lg:col-span-3 cursor-pointer pb-1 flex flex-col space-y-2"
            >
              <div className="h-40 rounded-md overflow-hidden">
                <LazyLoadImage
                  src={imageSrc}
                  className="object-cover bg-center w-full h-full"
                />
              </div>
              <h1>{categoryName}</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CommonRetaurantCategories;
