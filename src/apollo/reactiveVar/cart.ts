import { makeVar } from "@apollo/client";
import lodash from "lodash";
import { RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes } from "../../__generated__/RestaurantQuery";
export type ChoosenOption = {
  typeName: string;
  optionName: string;
};
export type CartItem = {
  dish: RestaurantQuery_getRestaurant_restaurant_dishGroups_dishes;
  quantity: number;
  requirement: string;
  choosenOptions: ChoosenOption[];
  totalItemPrice?: number;
};
type Cart = {
  cartItems: CartItem[];
  restaurantId: number;
  totalPrice?: number;
};
const LOCAL_CART = "LOCAL_CART";
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
function getCartFromLocalStorage(): Cart | null {
  const localCart = localStorage.getItem(LOCAL_CART);
  if (!localCart) return null;
  return JSON.parse(localCart);
}
function calculateTotalCartPrice(cart: Cart | null) {
  if (!cart) return;
  cart.totalPrice = cart.cartItems
    .map((item) => item.totalItemPrice || 0)
    .reduce((acc, cur) => acc + cur, 0);
  cartVar(cart);
}
function addItemToCart(cartItem: CartItem, restaurantId: number) {
  const currentCart = cartVar();
  if (!currentCart) {
    cartVar({
      cartItems: [cartItem],
      restaurantId,
    });
  } else {
    if (+restaurantId !== +currentCart.restaurantId) {
      cartVar(null);
      addItemToCart(cartItem, restaurantId);
      return;
    } else {
      let existed = false;
      currentCart.cartItems.forEach((onCartItem) => {
        const { choosenOptions, dish, requirement } = onCartItem;
        if (
          lodash.isEqual(choosenOptions, cartItem.choosenOptions) &&
          lodash.isEqual(dish, cartItem.dish) &&
          lodash.isEqual(requirement, cartItem.requirement)
        ) {
          existed = true;
          onCartItem.quantity += cartItem.quantity;
        }
      });
      if (!existed) {
        cartVar({
          cartItems: [...currentCart.cartItems, cartItem],
          restaurantId,
        });
      } else
        cartVar({
          cartItems: [...currentCart.cartItems],
          restaurantId,
        });
    }
  }
  const { choosenOptions, dish, quantity } = cartItem;
  cartItem.totalItemPrice = calculateParticularOrderItemPrice(
    choosenOptions,
    dish,
    quantity
  );
  calculateTotalCartPrice(cartVar());
  localStorage.setItem(LOCAL_CART, JSON.stringify(cartVar()));
}
function editItemInCart(cartItem: CartItem) {
  const cart = cartVar();
  if (!cart) return;
  const index = cart.cartItems.findIndex((item) => {
    return +item.dish.id === +cartItem.dish.id;
  });
  const { choosenOptions, dish, quantity } = cartItem;
  cartItem.totalItemPrice = calculateParticularOrderItemPrice(
    choosenOptions,
    dish,
    quantity
  );
  cart.cartItems[index] = cartItem;
  cartVar({
    cartItems: [...cart.cartItems],
    restaurantId: cart.restaurantId,
  });
  calculateTotalCartPrice(cartVar());
  localStorage.setItem(LOCAL_CART, JSON.stringify(cartVar()));
}
function removeItemFromCart(cartItemId: number) {
  const cart = cartVar();
  if (!cart) return;
  const { cartItems, restaurantId } = cart;
  if (!cartItems) return;
  const index = cartItems.findIndex((item) => +item.dish.id === cartItemId);
  if (index === -1) return;
  cartItems.splice(index, 1);
  if (cartItems.length === 0) {
    cartVar(null);
  } else {
    cartVar({
      cartItems,
      restaurantId,
    });
  }
  calculateTotalCartPrice(cartVar());
  localStorage.setItem(LOCAL_CART, JSON.stringify(cartVar()));
}
const cartVar = makeVar<Cart | null>(getCartFromLocalStorage());
export { cartVar, addItemToCart, removeItemFromCart, editItemInCart };
