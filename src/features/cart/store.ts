import { create } from "zustand";
import { Cart } from "@features/cart/model";

interface CartState {
  original: Cart;
  cart: Cart;
  setCart: (newCart: Cart) => void;
  initCart: (newCart: Cart) => void;
  resetCart: () => void;
}

const cartStore = create<CartState>()((set) => ({
  original: { cart: [] },
  cart: { cart: [] },
  initCart: (newCart: Cart) =>
    set(() => ({ cart: newCart, original: newCart })),
  setCart: (newCart: Cart) => set(() => ({ cart: newCart })),
  resetCart: () => {
    return set({
      cart: { cart: [] },
    });
  },
}));

export { cartStore };
