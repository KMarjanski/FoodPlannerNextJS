"use client";

import { Recipes } from "@/models/recipes";
import { recipesStore } from "@/store/recipes";
import React, { useEffect } from "react";
import Spinner from "../common/Spinner";
import Page from "./Page";

const RecipesInitializer = ({ recipes }: { recipes: Recipes }) => {
  const storeRecipes = recipesStore((state) => state.recipes);
  const initRecipes = recipesStore((state) => state.initRecipes);
  const originalRecipes = recipesStore((state) => state.original);
  useEffect(() => {
    JSON.stringify(originalRecipes) !== JSON.stringify(recipes) &&
      initRecipes(recipes);
  }, [originalRecipes, initRecipes, recipes]);
  return storeRecipes[0].name ? <Page /> : <Spinner />;
};

export default RecipesInitializer;
