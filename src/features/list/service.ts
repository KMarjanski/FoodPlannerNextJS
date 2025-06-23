"use server";

import Cart from "@/src/features/cart/model";

const getList = async () => {
  return Cart.find();
};

export { getList };
