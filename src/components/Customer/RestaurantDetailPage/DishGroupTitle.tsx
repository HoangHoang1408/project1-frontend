import React, { Dispatch, FC, SetStateAction } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { RestaurantQuery_getRestaurant_restaurant_dishGroups } from "../../../__generated__/RestaurantQuery";
interface Props {
  dishGroups: RestaurantQuery_getRestaurant_restaurant_dishGroups[];
  dishGroupActive: number;
  setDishGroupActive: Dispatch<SetStateAction<number>>;
}
const DishGroupTitle: FC<Props> = ({
  dishGroupActive,
  setDishGroupActive,
  dishGroups,
}) => {
  return (
    <div className="sticky top-12 left-0 bg-white shadow-sm">
      <ScrollContainer
        vertical={false}
        hideScrollbars={true}
        className="flex mt-6"
      >
        {dishGroups.map((group, i) => {
          const activeClass =
            i === dishGroupActive
              ? " border-b-green-500 text-green-500"
              : " border-b-transparent  text-slate-500";
          return (
            <div
              onClick={() => {
                setDishGroupActive(i);
              }}
              key={i}
              className={
                "px-3 py-1 text-lg font-semibold cursor-pointer hover:text-green-500 duration-200 border-b-2 transition-all flex-shrink-0 select-none" +
                activeClass
              }
            >
              {group.dishGroupName}
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export default DishGroupTitle;
