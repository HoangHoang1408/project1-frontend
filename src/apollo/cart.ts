import { makeVar } from "@apollo/client";



interface Cart {
  
}

const cart = makeVar<Cart | null>(null);

export {};
