"use server";

import Cart from "@/src/features/cart/model";

const getCart = async () => {
  const result = await Cart.find();
  // Zamień _id na string w każdym entry
  const plain = result.map((entry: any) => ({
    ...entry.toObject(),
    _id: entry._id?.toString?.() ?? String(entry._id),
  }));
  return JSON.parse(JSON.stringify(plain));
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
