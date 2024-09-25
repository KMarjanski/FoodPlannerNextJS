import { create } from "zustand";
import { Ingredients } from "@/models/ingredients";

interface IngredientsState {
  ingredients: Ingredients;
  setIngredients: (newIngredients: Ingredients) => void;
}

const ingredientsStore = create<IngredientsState>()((set) => ({
  ingredients: [{ name: "", category: "", inRecipes: [""] }],
  setIngredients: (newIngredients: Ingredients) =>
    set(() => ({ ingredients: newIngredients })),
}));

export { ingredientsStore };
