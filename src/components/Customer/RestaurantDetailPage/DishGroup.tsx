import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, FC, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dishImage } from "../../../images";
import { RetaurantQuery_getRestaurant_restaurant_dishGroups } from "../../../__generated__/RetaurantQuery";
interface Props {
  dishGroupActive: number;
  dishGroupNumber: number;
  dishGroup: RetaurantQuery_getRestaurant_restaurant_dishGroups;
  setDishGroupActive: Dispatch<React.SetStateAction<number>>;
}

const DishGroup: FC<Props> = ({
  dishGroupActive,
  dishGroupNumber,
  setDishGroupActive,
  dishGroup,
}) => {
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
        console.log(
          document.body.scrollHeight === scrollY + window.innerHeight
        );
      }
    });
  }, [dishGroupNumber, setDishGroupActive]);
  return (
    <div ref={ref} className="scroll-mt-28 space-y-6 select-none ">
      <h1 className="text-3xl font-semibold text-slate-700">Dish Group Name</h1>
      <div className="grid grid-cols-12 gap-6">
        {dishGroup.dishes?.map((dish, i) => {
          return (
            <div
              key={i}
              className="p-3 rounded overflow-hidden col-span-12 sm:col-span-6 lg:col-span-4 grid grid-cols-12 gap-3 border-2 border-transparent hover:border-green-500 cursor-pointer transition"
            >
              <LazyLoadImage
                className="col-span-5 w-full h-36 rounded object-cover bg-center"
                src={dish.dishImage?.imageUrl && dishImage}
              />

              <div className="col-span-7 flex flex-col justify-between space-y-3">
                <div>
                  <h1 className="text-slate-700 font-semibold text-lg">
                    {dish.name}
                  </h1>
                  <div className="text-sm text-slate-500">
                    {dish.description}
                  </div>
                </div>
                <div className="text-right w-8 h-8 bg-green-500 grid place-items-center self-end hover:bg-green-600 cursor-pointer rounded">
                  <FontAwesomeIcon className="text-xl" icon={faPlus} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishGroup;
