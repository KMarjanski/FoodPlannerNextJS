"use client";

import React, { useEffect, useState } from "react";
import Spinner from "@/src/shared/components/Spinner";
import { recipesStore } from "@features/recipes/store";
import { Recipes } from "@features/recipes/model";
import { plannerStore } from "@features/planner/store";
import { Planner } from "@features/planner/model";
import Page from "@features/planner/components/Page";

export default function PlannerInitializer({
  planner,
  recipes,
}: {
  planner: Planner;
  recipes: Recipes;
}) {
  const [initializing, setInitializing] = useState(true);
  const originalPlanner = plannerStore((state) => state.original);
  const initPlanner = plannerStore((state) => state.initPlanner);
  const initRecipes = recipesStore((state) => state.initRecipes);
  const originalRecipes = recipesStore((state) => state.original);
  useEffect(() => {
    JSON.stringify(originalPlanner) !== JSON.stringify(planner) &&
      initPlanner(planner);
    JSON.stringify(originalRecipes) !== JSON.stringify(recipes) &&
      initRecipes(recipes);
    setInitializing(false);
  }, [
    planner,
    initPlanner,
    recipes,
    initRecipes,
    originalPlanner,
    originalRecipes,
  ]);
  return initializing ? <Spinner /> : <Page />;
}
