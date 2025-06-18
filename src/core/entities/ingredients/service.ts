"use server";

import Ingredients from "@core/entities/ingredients/model";

const getIngredients = async () => {
  return Ingredients.find();
};

export { getIngredients };
