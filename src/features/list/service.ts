"use server";

import Cart from "@features/chart/model";

const getList = async () => {
  return Cart.find();
};

export { getList };
