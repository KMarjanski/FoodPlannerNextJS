"use client";

import { Planner } from "@features/planner/model";
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
  const moveRecipe = (meal: keyof typeof dayPlan, recipe: string, add: boolean) => {
    const newDay = { ...dayPlan };
    if (!Array.isArray(newDay[meal])) {
      newDay[meal] = [];
    }
    if (add) {
      newDay[meal] = [...newDay[meal], recipe];
    } else {
      newDay[meal] = newDay[meal].filter((r) => r !== recipe);
    }
    const newPlanner = { ...planner, [dayKey]: newDay };
    setPlannerStore(newPlanner);
  };

  // Przypisanie domyślnego typu posiłku (obiad) jeśli nie istnieje
  // Zakładamy, że Recipe może mieć mealType: 'breakfast' | 'lunch' | 'dinner' | undefined
  type RecipeWithType = { name: string; mealType: 'breakfast' | 'lunch' | 'dinner' | 'all' };
  const mapType = (type: string | undefined): 'breakfast' | 'lunch' | 'dinner' | 'all' => {
    if (!type) return 'all';
    // Usuwanie diakrytyków bez flagi 'u' (dla zgodności z ES5)
    const t = type
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^\w\s\-\_\.]/g, "");
    if (t.includes('sniadanie') || t.includes('breakfast')) return 'breakfast';
    if (t.includes('kolacja') || t.includes('dinner')) return 'dinner';
    if (t.includes('obiad') || t.includes('lunch')) return 'lunch';
    return 'all'; // nieznany typ, pokaż w każdej sekcji
  };
  const allRecipesWithType: RecipeWithType[] = allRecipes.map((r) => {
    const typeField = (r as any).mealType || (r as any).type;
    const mealType = mapType(typeField);
    return { name: r.name, mealType };
  });

  // Przepisy dostępne do dodania (nieprzypisane do danego posiłku)
  const availableRecipesMemo = useMemo(() => {
    const result: { [key: string]: string[] } = {};
    (['breakfast', 'lunch', 'dinner'] as const).forEach((meal) => {
      let names = allRecipesWithType
        .filter((r) => r.mealType === meal || r.mealType === 'all')
        .map((r) => r.name);
      names = Array.from(new Set(names));
      if (Array.isArray(dayPlan[meal])) {
        names = names.filter((name) => !dayPlan[meal].includes(name));
      }
      names = names.filter((name) => name.toLowerCase().includes(search.toLowerCase()));
      result[meal] = names;
    });
    return result;
  }, [allRecipesWithType, dayPlan, search]);

  // Układ: śniadanie, obiad, kolacja od góry do dołu
    const renderMealRow = (meal: keyof typeof dayPlan, label: string, color: string) => {
    const recipes = availableRecipesMemo[meal] || [];
    // Kolory borderów i badge dla sekcji
    const borderColors: Record<string, string> = {
      breakfast: 'border-yellow-700',
      lunch: 'border-green-700',
      dinner: 'border-blue-700',
    };
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
      breakfast: 'bg-yellow-400 text-yellow-900',
      lunch: 'bg-green-400 text-green-900',
      dinner: 'bg-blue-400 text-blue-900',
    };
    const borderColor = borderColors[meal];
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
          <div className={`flex-1 flex flex-wrap gap-2 justify-start border-r border-solid pr-20 max-h-48 overflow-y-auto ${borderColor} ${scrollbarColor}`}>
            {recipes.length === 0 && (
              <span className="text-gray-400 text-xs">Brak</span>
            )}
            {recipes.map((recipe, i) => {
              // Sprawdź, czy przepis jest już przypisany do wybranych
              const isSelected = Array.isArray(dayPlan[meal]) && dayPlan[meal].includes(recipe);
              return (
                <button
                  key={recipe + "-add"}
                  type="button"
                  className={`px-4 py-2 text-base font-semibold rounded-lg cursor-pointer transition-colors duration-150 ${badgeColor} hover:${badgeSelectedColor} ${isSelected ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => !isSelected && moveRecipe(meal, recipe, true)}
                  aria-disabled={isSelected}
                  title={isSelected ? 'Przepis już przypisany' : 'Dodaj do wybranych'}
                >
                  {recipe}
                </button>
              );
            })}
          </div>
          {/* Przypisane przepisy */}
          <div className={`flex-1 flex flex-wrap gap-2 justify-end border-l border-solid pl-20 w-full content-start max-h-48 overflow-y-auto ${borderColor} ${scrollbarColor}`}>
            {Array.isArray(dayPlan[meal]) && dayPlan[meal].length === 0 && (
              <span className="text-gray-400 text-xs">Brak</span>
            )}
            {Array.isArray(dayPlan[meal]) && dayPlan[meal].map((recipe, i) => (
              <button
                key={recipe + "-remove"}
                type="button"
                className={`px-4 py-2 text-base font-semibold rounded-lg cursor-pointer transition-colors duration-150 ${badgeSelectedColor} hover:bg-red-400 hover:text-white self-start`}
                onClick={() => moveRecipe(meal, recipe, false)}
                title="Usuń z wybranych"
              >
                {recipe}
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

// Custom scrollbar styles for each section
import "./scrollbarColors.css";
export default ModalBody;
