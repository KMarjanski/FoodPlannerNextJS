"use server";

import Recipes from "@features/recipes/model";

const getRecipes = async () => {
  return Recipes.find();
};

export { getRecipes };
