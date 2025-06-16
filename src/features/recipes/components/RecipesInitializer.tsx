"use client";

import React, { useEffect } from "react";
import Spinner from "@shared/components/Spinner";
import Page from "@features/recipes/components/Page";
import { Recipes } from "@features/recipes/model";
import { recipesStore } from "@features/recipes/store";
import { Ingredients } from "@shared/model";
import { ingredientsStore } from "@shared/store";

const RecipesInitializer = ({
  ingredients,
  recipes,
}: {
  ingredients: Ingredients;
  recipes: Recipes;
}) => {
  const storeRecipes = recipesStore((state: { recipes: any }) => state.recipes);
  const initRecipes = recipesStore(
    (state: { initRecipes: any }) => state.initRecipes
  );
  const originalRecipes = recipesStore(
    (state: { original: any }) => state.original
  );
  const setIngredients = ingredientsStore(
    (state: { setIngredients: any }) => state.setIngredients
  );
  useEffect(() => {
    setIngredients(ingredients);
    JSON.stringify(originalRecipes) !== JSON.stringify(recipes) &&
      initRecipes(recipes);
  }, [originalRecipes, initRecipes, recipes, setIngredients, ingredients]);
  return storeRecipes[0].name ? <Page /> : <Spinner />;
};

export default RecipesInitializer;
