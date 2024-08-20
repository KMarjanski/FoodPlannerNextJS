"use client";

import { plannerStore } from "@/store/planner";
import { Planner } from "@/models/planner";
import React, { useEffect } from "react";
import Day from "./Day/Day";
import { Recipes } from "@/models/recipes";
import { recipesStore } from "@/store/recipes";

export default function PlannerInitializer({
  planner,
  recipes,
}: {
  planner: Planner;
  recipes: Recipes;
}) {
  const storePlanner = plannerStore((state) => state.planner);
  const initPlanner = plannerStore((state) => state.initPlanner);
  const initRecipes = recipesStore((state) => state.initRecipes);
  useEffect(() => {
    initPlanner(planner);
    initRecipes(recipes);
  }, [planner, initPlanner]);
  return (
    <>
      {Object.keys(storePlanner).map((key, i) => {
        const typeKey = Object.keys(planner)[i] as keyof Planner;
        const getClassName = () => {
          if (i === 0 || i === 2) return "col-start-1 col-end-4";
          else if (i === 1 || i === 3) return "col-start-4 col-end-7";
          else if (i === 4) return "col-start-1 col-end-3";
          else if (i === 5) return "col-start-3 col-end-5";
          else return "col-start-5 col-end-7";
        };
        return (
          <div key={key} className={getClassName()}>
            <Day day={i} meals={storePlanner[typeKey]} />
          </div>
        );
      })}
    </>
  );
}
