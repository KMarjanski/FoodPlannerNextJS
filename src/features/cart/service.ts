"use server";

import Cart, { Cart as CartModel } from "@/src/features/cart/model";

const getCart = async () => {
  return Cart.find();
};

const setCart = (newCart: CartModel) => {
  Cart.findOneAndReplace({}, newCart, { returnNewDocument: false }).then(
    (x) => x
  );
};

export { getCart, setCart };
