"use client";

import { plannerStore } from "@/store/planner";
import { Planner } from "@/models/planner";
import React, { useEffect, useState } from "react";
import { Recipes } from "@/models/recipes";
import { recipesStore } from "@/store/recipes";
import Spinner from "../common/Spinner";
import Page from "./Page";

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
