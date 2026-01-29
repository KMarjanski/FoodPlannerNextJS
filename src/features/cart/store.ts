/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Cart } from "@features/cart/model";

interface CartState {
  original: Cart;
  cart: Cart;
  setCart: (_newCart: Cart) => void;
  initCart: (_newCart: Cart) => void;
  resetCart: () => void;
}

const cartStore = create<CartState>()((set) => ({
  original: [],
  cart: [],
  initCart: (newCart: Cart) =>
    set(() => ({ cart: newCart, original: newCart })),
  setCart: (newCart: Cart) => set(() => ({ cart: newCart })),
  resetCart: () => {
    return set({
      cart: [],
    });
  },
}));

export { cartStore };
