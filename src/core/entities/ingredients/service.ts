"use server";

import Ingredients from "@core/entities/ingredients/model";

const getIngredients = async () => {
  return Ingredients.find();
};

// Usuń składnik po nazwie
const deleteIngredientByName = async (name: string) => {
  return Ingredients.deleteOne({ name });
};

export { getIngredients };
export { deleteIngredientByName };
