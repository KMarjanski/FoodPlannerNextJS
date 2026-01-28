"use server";

import Cart, { Cart as CartModel } from "@/src/features/cart/model";

const getCart = async () => {
  const result = await Cart.find();
  return JSON.parse(JSON.stringify(result));
};

// newCartEntry: pojedynczy CartEntry (nie tablica!)
const setCart = async (newCartEntry: any) => {
  let result;
  if (newCartEntry && newCartEntry._id) {
    // Aktualizuj po _id
    result = await Cart.findOneAndUpdate(
      { _id: newCartEntry._id },
      { $set: { cart: newCartEntry.cart } },
      { upsert: true, new: true }
    );
  } else {
    // Jeśli nie ma _id, utwórz nowy dokument
    result = await Cart.create({ cart: newCartEntry.cart });
  }
  return JSON.parse(JSON.stringify(result));
};

export { getCart, setCart };
