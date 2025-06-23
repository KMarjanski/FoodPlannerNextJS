"use server";

import Chart from "@features/chart/model";

const getCart = async () => {
  return Chart.find();
};

export { getCart };
