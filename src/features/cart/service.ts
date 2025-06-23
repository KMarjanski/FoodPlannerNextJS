"use server";

import Chart from "@/src/features/cart/model";

const getCart = async () => {
  return Chart.find();
};

export { getCart };
