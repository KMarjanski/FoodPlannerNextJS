"use client";

import { Recipes } from "@/models/recipes";
import { recipesStore } from "@/store/recipes";
import React, { useEffect } from "react";
import Spinner from "../common/Spinner";
import Page from "./Page";
import { Ingredients } from "@/models/ingredients";
import { ingredientsStore } from "@/store/ingredients";

const RecipesInitializer = ({
  ingredients,
  recipes,
}: {
  ingredients: Ingredients;
  recipes: Recipes;
}) => {
  const storeRecipes = recipesStore((state) => state.recipes);
  const initRecipes = recipesStore((state) => state.initRecipes);
  const originalRecipes = recipesStore((state) => state.original);
  const setIngredients = ingredientsStore((state) => state.setIngredients);
  useEffect(() => {
    setIngredients(ingredients);
    JSON.stringify(originalRecipes) !== JSON.stringify(recipes) &&
      initRecipes(recipes);
  }, [originalRecipes, initRecipes, recipes, setIngredients, ingredients]);
  return storeRecipes[0].name ? <Page /> : <Spinner />;
};

export default RecipesInitializer;
