"use server";

import Cart from "@/models/cart";

const getList = async () => {
  return Cart.find();
};

export { getList };
