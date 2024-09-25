"use server";

import Ingredients from "@/models/ingredients";

const getIngredients = async () => {
  return Ingredients.find();
};

export { getIngredients };
