"use server";

import Ingredients from "@core/entities/ingredients/model";

const getIngredients = async () => {
  const result = await Ingredients.find();
  return JSON.parse(JSON.stringify(result));
};

// Usuń składnik po nazwie
const deleteIngredientByName = async (name: string) => {
  return Ingredients.deleteOne({ name });
};

// Dodaj nowy składnik
const createIngredient = async (ingredient: {
  name: string;
  category: string;
  inRecipes: string[];
}) => {
  const doc = await Ingredients.create(ingredient);
  return JSON.parse(JSON.stringify(doc));
};

export { getIngredients };
export { deleteIngredientByName };
export { createIngredient };
