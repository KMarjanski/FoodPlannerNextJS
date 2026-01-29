/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Ingredients } from "@core/entities/ingredients/model";

interface IngredientsState {
  ingredients: Ingredients;
  setIngredients: (_newIngredients: Ingredients) => void;
}

const ingredientsStore = create<IngredientsState>()((set) => ({
  ingredients: [],
  setIngredients: (newIngredients: Ingredients) =>
    set(() => ({ ingredients: newIngredients })),
}));

export { ingredientsStore };
