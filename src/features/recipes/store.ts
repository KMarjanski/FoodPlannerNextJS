/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Recipes } from "@features/recipes/model";

interface RecipesState {
  original: Recipes;
  recipes: Recipes;
  setRecipes: (_newRecipes: Recipes) => void;
  initRecipes: (_newRecipes: Recipes) => void;
}

const recipesStore = create<RecipesState>()((set) => ({
  original: [{ name: "", ingredients: [] }],
  recipes: [{ name: "", ingredients: [] }],
  initRecipes: (newRecipes: Recipes) =>
    set(() => ({ recipes: newRecipes, original: newRecipes })),
  setRecipes: (newRecipes: Recipes) => set(() => ({ recipes: newRecipes })),
}));

export { recipesStore };
