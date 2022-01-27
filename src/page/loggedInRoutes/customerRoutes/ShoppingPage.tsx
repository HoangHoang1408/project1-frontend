import { gql, useQuery } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CommonRestaurants from "../../../components/Customer/ShoppingPage/CommonRestaurants";
import CommonRetaurantCategories from "../../../components/Customer/ShoppingPage/CommonRetaurantCategories";
import { RESTAURANT_CART_FRAGMENT } from "../../../constants/fragment/RestaurantCardFragment";
import { mainImage } from "../../../images";
import { ShopingPageQuery } from "../../../__generated__/ShopingPageQuery";

const ShoppingPage = () => {
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
      <LazyLoadImage
        className="object-cover bg-center w-full h-80"
        src={mainImage}
      />
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

const SHOPING_PAGE_QUERY = gql`
  ${RESTAURANT_CART_FRAGMENT}
  query ShopingPageQuery {
    topRestaurants {
      ok
      error {
        message
      }
      restaurants {
        ...RestaurantCard
      }
    }
    topRestaurantCategories {
      ok
      error {
        message
      }
      restaurantCategories {
        id
        name
        coverImage {
          imagePath
          imageUrl
        }
      }
    }
  }
`;

export default ShoppingPage;
