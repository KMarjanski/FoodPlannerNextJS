"use server";

import Recipes from "@/models/recipes";

const getRecipes = async () => {
  return Recipes.find();
};

export { getRecipes };
