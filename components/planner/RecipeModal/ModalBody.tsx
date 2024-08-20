"use client";

import { Recipe } from "@/models/recipes";
import { plannerStore } from "@/store/planner";
import { recipesStore } from "@/store/recipes";
import React from "react";

const ModalBody = (props: { day: number }) => {
  const planner = plannerStore((state) => state.planner);
  const selectedRecipes = Object.values(planner)[props.day];
  const allRecipes = recipesStore((state) => state.recipes);
  console.log(selectedRecipes);
  console.log(allRecipes);
  return (
    <div className="flex flex-row">
      <div className="basis-1/3">
        {selectedRecipes.map((recipe: string, i: number) => {
          return (
            <div className="badge p-3 bg-green-600" key={i}>
              {recipe}
            </div>
          );
        })}
      </div>
      <div className="basis-1/3">
        <center>{"<-"}</center>
      </div>
      <div className="basis-1/3">
        {allRecipes.map((recipe: Recipe, i: number) => {
          return (
            <div className="badge p-3 bg-green-600" key={i}>
              {recipe.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalBody;
