import { create } from "zustand";
import { Recipes } from "@/models/recipes";

interface RecipesState {
  original: Recipes;
  recipes: Recipes;
  setRecipes: (newRecipes: Recipes) => void;
  initRecipes: (newRecipes: Recipes) => void;
}

const recipesStore = create<RecipesState>()((set) => ({
  original: [{ name: "", ingredients: [] }],
  recipes: [{ name: "", ingredients: [] }],
  initRecipes: (newRecipes: Recipes) =>
    set(() => ({ recipes: newRecipes, original: newRecipes })),
  setRecipes: (newRecipes: Recipes) => set(() => ({ recipes: newRecipes })),
}));

export { recipesStore };
