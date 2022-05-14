import { ChoosenOption } from "../apollo/reactiveVar/cart";
import { RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes } from "../__generated__/RestaurantQuery";
interface DishOption {
  typeName: string;
  options: {
    optionName: string;
    extraPrice: number;
  }[];
}

export const calculateParticularOrderItemPrice = (
  choosenOptions: ChoosenOption[],
  dish: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes,
  quantity: number
) => {
  const { dishOptions, price } = dish;
  let totalExtraPrice = 0;
  if (choosenOptions && choosenOptions.length > 0)
    totalExtraPrice = choosenOptions
      .map(
        ({
          typeName: choosenOptionTypeName,
          optionName: choosenOptionName,
        }) => {
          const dishOption = dishOptions?.find(
            ({ typeName }) => typeName === choosenOptionTypeName
          );
          if (!dishOption) return 0;
          const extraPrice = dishOption.options.find(
            ({ optionName }) => optionName === choosenOptionName
          )?.extraPrice;
          return extraPrice || 0;
        }
      )
      .reduce((acc, cur) => acc + +cur, 0);
  return (
    Math.round((price * 100 + totalExtraPrice * 100) * quantity * 100) / 10000
  );
};
