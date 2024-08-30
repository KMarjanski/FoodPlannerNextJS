"use client";

import { Planner } from "@/models/planner";
import { Recipe } from "@/models/recipes";
import { plannerStore } from "@/store/planner";
import { recipesStore } from "@/store/recipes";
import React, { useState } from "react";

const ModalBody = (props: { day: number }) => {
  const planner = plannerStore((state) => state.planner);
  const setPlannerStore = plannerStore((state) => state.setPlanner);
  const selectedRecipes = Object.values(planner)[props.day];
  const allRecipes = recipesStore((state) => state.recipes);
  const [value, setValue] = useState("");
  const handleOnBadgeClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    add: boolean
  ) => {
    const input = event.target as HTMLElement;
    const newDay = add
      ? [...selectedRecipes, input.innerText]
      : selectedRecipes.filter((recipe) => recipe !== input.innerText);
    const newPlanner = Object.fromEntries(
      Object.entries(planner).map((planDay, i) =>
        i === props.day ? [planDay[0], newDay] : planDay
      )
    ) as Planner;
    setPlannerStore(newPlanner);
  };
  return (
    <div className="">
      <center>
        {selectedRecipes.map((recipe: string, i: number) => {
          return (
            <div
              className="badge p-3 bg-green-600 cursor-pointer"
              onClick={(e) => handleOnBadgeClick(e, false)}
              key={i}
            >
              {recipe}
            </div>
          );
        })}
      </center>
      <center className="my-2">{"↕"}</center>
      <input
        className="rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <center>
        {allRecipes
          .filter(
            (recipe) =>
              !selectedRecipes.some(
                (selectedRecipe) => selectedRecipe === recipe.name
              )
          )
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((recipe: Recipe, i: number) => {
            return (
              <div
                className="badge p-3 bg-green-600 cursor-pointer"
                onClick={(e) => handleOnBadgeClick(e, true)}
                key={i}
              >
                {recipe.name}
              </div>
            );
          })}
      </center>
    </div>
  );
};

export default ModalBody;
