"use server";

import Ingredients from "@shared/model";

const getIngredients = async () => {
  return Ingredients.find();
};

export { getIngredients };
