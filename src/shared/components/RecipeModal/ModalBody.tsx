"use client";

import { Planner } from "@features/planner/model";
import type { Recipe } from "@features/recipes/model";
import { plannerStore } from "@features/planner/store";
import { recipesStore } from "@features/recipes/store";
import React, { useState, useMemo } from "react";

const ModalBody = (props: { day: number }) => {
  const planner = plannerStore((state) => state.planner);
  const setPlannerStore = plannerStore((state) => state.setPlanner);
  const allRecipes = recipesStore((state) => state.recipes);
  const [search, setSearch] = useState("");
  const dayKey = Object.keys(planner)[props.day] as keyof Planner;
  const dayPlan = planner[dayKey];

  // Funkcja do przerzucania przepisów
  const moveRecipe = (meal: keyof typeof dayPlan, recipe: Recipe, add: boolean) => {
    const newDay = { ...dayPlan };
    if (!Array.isArray(newDay[meal])) {
      newDay[meal] = [];
    }
    // Jeśli recipe to string (ID), znajdź pełny obiekt Recipe
    let recipeObj: Recipe | null = recipe && typeof recipe === 'object' ? recipe : null;
    if (!recipeObj && typeof recipe === 'string') {
      recipeObj = allRecipes.find(r => (r as any)._id === recipe || (r as any).id === recipe || r.name === recipe) || null;
    }
    if (!recipeObj) return;
    if (add) {
      if (!newDay[meal].some((r: Recipe | null) => r && r.name === recipeObj!.name)) {
        newDay[meal] = [...newDay[meal], recipeObj];
      }
    } else {
      newDay[meal] = newDay[meal].filter((r: Recipe) => r.name !== recipeObj!.name);
    }
    const newPlanner = { ...planner, [dayKey]: newDay };
    setPlannerStore(newPlanner);
  };

  // Przypisanie domyślnego typu posiłku (obiad) jeśli nie istnieje
  // Zakładamy, że Recipe może mieć mealType: 'breakfast' | 'lunch' | 'dinner' | undefined
  const mapType = (type: string | undefined): 'breakfast' | 'lunch' | 'dinner' | 'all' => {
    if (!type) return 'lunch';
    // Usuwanie diakrytyków bez flagi 'u' (dla zgodności z ES5)
    const t = type
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^\w\s\-\_\.]/g, "");
    if (t.includes('sniadanie') || t.includes('breakfast')) return 'breakfast';
    if (t.includes('kolacja') || t.includes('dinner')) return 'dinner';
    if (t.includes('obiad') || t.includes('lunch')) return 'lunch';
    return 'lunch'; // nieznany typ, domyślnie obiad
  };

  // Przepisy dostępne do dodania (nieprzypisane do danego posiłku)
  const availableRecipesMemo = useMemo(() => {
    const result: { [key: string]: Recipe[] } = {};
    (['breakfast', 'lunch', 'dinner'] as const).forEach((meal) => {
      let recipes = allRecipes.filter((r) => {
        const typeField = (r as any).mealType || (r as any).type;
        const mealType = mapType(typeField);
        return mealType === meal || mealType === 'all';
      });
      // Filtruj, aby nie pokazywać już przypisanych przepisów
      if (Array.isArray(dayPlan[meal])) {
        recipes = recipes.filter((r) => !dayPlan[meal].some((d: Recipe | null) => d && d.name === r.name));
      }
      recipes = recipes.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
      result[meal] = recipes;
    });
    return result;
  }, [allRecipes, dayPlan, search]);

  // Układ: śniadanie, obiad, kolacja od góry do dołu
  const renderMealRow = (meal: keyof typeof dayPlan, label: string, color: string) => {
    const recipes = availableRecipesMemo[meal] || [];
    // Kolory borderów i badge dla sekcji
    const scrollbarColors: Record<string, string> = {
      breakfast: 'scrollbar-yellow',
      lunch: 'scrollbar-green',
      dinner: 'scrollbar-blue',
    };
    const badgeColors: Record<string, string> = {
      breakfast: 'bg-yellow-200 text-yellow-900',
      lunch: 'bg-green-200 text-green-900',
      dinner: 'bg-blue-200 text-blue-900',
    };
    const badgeSelectedColors: Record<string, string> = {
      breakfast: 'bg-yellow-200 text-yellow-900',
      lunch: 'bg-green-200 text-green-900',
      dinner: 'bg-blue-200 text-blue-900',
    };
    const scrollbarColor = scrollbarColors[meal];
    // Ustal kolory badge na podstawie meal przekazywanego do renderMealRow
    let badgeColor = '';
    let badgeSelectedColor = '';
    if (meal === 'breakfast') {
      badgeColor = badgeColors.breakfast;
      badgeSelectedColor = badgeSelectedColors.breakfast;
    } else if (meal === 'lunch') {
      badgeColor = badgeColors.lunch;
      badgeSelectedColor = badgeSelectedColors.lunch;
    } else if (meal === 'dinner') {
      badgeColor = badgeColors.dinner;
      badgeSelectedColor = badgeSelectedColors.dinner;
    }
    return (
      <div className="flex flex-col mb-4 w-full" key={meal}>
        <div className="flex flex-row w-full items-center mb-1">
          <span
            className="font-bold text-lg min-w-[120px] text-left mr-16 select-none"
            style={{ color }}
          >
            {label}
          </span>
          <div className="flex-1 text-xs text-gray-500 font-semibold text-left pl-2">Wszystkie przepisy</div>
          <div className="flex-1 text-xs text-gray-500 font-semibold text-right pr-2">Wybrane przepisy</div>
        </div>
        <div className="flex flex-row w-full items-stretch">
          {/* Dostępne przepisy */}
          <div className={`flex-1 flex flex-wrap gap-2 justify-start pr-20 max-h-48 overflow-y-auto ${scrollbarColor}`}>
            {recipes.length === 0 && (
              <span className="text-gray-400 text-xs">Brak</span>
            )}
            {recipes.map((recipe) => {
              // Sprawdź, czy przepis jest już przypisany do wybranych
              const isSelected = Array.isArray(dayPlan[meal]) && dayPlan[meal].some((r: Recipe | null) => r && r.name === recipe.name);
              return (
                <button
                  key={recipe.name + "-add"}
                  type="button"
                  className={`px-4 py-2 text-base font-semibold rounded-lg cursor-pointer transition-colors duration-150 ${badgeColor} hover:${badgeSelectedColor} ${isSelected ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => !isSelected && moveRecipe(meal, recipe, true)}
                  aria-disabled={isSelected}
                  title={isSelected ? 'Przepis już przypisany' : 'Dodaj do wybranych'}
                >
                  {recipe.name}
                </button>
              );
            })}
          </div>
          {/* Przypisane przepisy */}
          <div className={`flex-1 flex flex-wrap gap-2 justify-end pl-20 w-full content-start max-h-48 overflow-y-auto ${scrollbarColor}`}>
            {Array.isArray(dayPlan[meal]) && dayPlan[meal].length === 0 && (
              <span className="text-gray-400 text-xs">Brak</span>
            )}
            {Array.isArray(dayPlan[meal]) && dayPlan[meal]
              .filter((recipe: Recipe | null) => recipe && recipe.name)
              .map((recipe: Recipe) => (
                <button
                  key={recipe.name + "-remove"}
                  type="button"
                  className={`px-4 py-2 text-base font-semibold rounded-lg cursor-pointer transition-colors duration-150 ${badgeSelectedColor} hover:bg-red-400 hover:text-white self-start`}
                  onClick={() => moveRecipe(meal, recipe, false)}
                  title="Usuń z wybranych"
                >
                  {recipe.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Szukaj przepisu..."
      />
      <div className="flex flex-col gap-4">
        <div className="border border-yellow-400 rounded-md p-2 bg-yellow-50">
          {renderMealRow("breakfast", "Śniadanie", "#b59f3b")}
        </div>
        <div className="border border-green-400 rounded-md p-2 bg-green-50">
          {renderMealRow("lunch", "Obiad", "#3bb54a")}
        </div>
        <div className="border border-blue-400 rounded-md p-2 bg-blue-50">
          {renderMealRow("dinner", "Kolacja", "#3b6cb5")}
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
