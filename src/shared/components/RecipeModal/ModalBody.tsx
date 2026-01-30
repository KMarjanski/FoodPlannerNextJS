"use client";

import { Planner } from "@features/planner/model";
import type { Recipe } from "@features/recipes/model";
import { plannerStore } from "@features/planner/store";
import { recipesStore } from "@features/recipes/store";
import React, { useState, useMemo } from "react";
import MealSection from "@shared/components/MealSection";
import SectionBox from "@shared/components/SectionBox";
import Input from "@shared/components/Input";


const ModalBody = (props: { week: number; day: number }) => {
  const planner = plannerStore((state) => state.planner);
  const setPlannerStore = plannerStore((state) => state.setPlanner);
  const allRecipes = recipesStore((state) => state.recipes);
  const [search, setSearch] = useState("");
  let safeWeeks = Array.isArray(planner.weeks) ? planner.weeks : [];
  // Jeśli nie ma żadnego tygodnia, automatycznie dodaj pusty tydzień
  if (safeWeeks.length === 0) {
    const emptyDay = { breakfast: [], lunch: [], dinner: [] };
    const emptyWeek = {
      MON: { ...emptyDay },
      TUE: { ...emptyDay },
      WED: { ...emptyDay },
      THU: { ...emptyDay },
      FRI: { ...emptyDay },
      SAT: { ...emptyDay },
      SUN: { ...emptyDay },
    };
    safeWeeks = [emptyWeek];
  }
  const weekPlan = safeWeeks[props.week] || safeWeeks[0];
  const dayKey = weekPlan ? Object.keys(weekPlan)[props.day] as keyof typeof weekPlan : undefined;
  const dayPlan = weekPlan && dayKey ? weekPlan[dayKey] : { breakfast: [], lunch: [], dinner: [] };

  // Funkcja do przerzucania przepisów
  const moveRecipe = (meal: keyof typeof dayPlan, recipe: Recipe, add: boolean) => {
    if (!weekPlan || !dayKey) return;
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
    // Zaktualizuj planner dla odpowiedniego tygodnia i dnia
    let baseWeeks = Array.isArray(planner.weeks) && planner.weeks.length > 0
      ? planner.weeks
      : [
          {
            MON: { breakfast: [], lunch: [], dinner: [] },
            TUE: { breakfast: [], lunch: [], dinner: [] },
            WED: { breakfast: [], lunch: [], dinner: [] },
            THU: { breakfast: [], lunch: [], dinner: [] },
            FRI: { breakfast: [], lunch: [], dinner: [] },
            SAT: { breakfast: [], lunch: [], dinner: [] },
            SUN: { breakfast: [], lunch: [], dinner: [] },
          },
        ];
    const newWeeks = baseWeeks.map((w, idx) => {
      if (idx !== props.week) return w;
      return { ...w, [dayKey]: newDay };
    });
    const newPlanner = { ...planner, weeks: newWeeks };
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

  // Konfiguracja dla MealSection
  const mealConfigs: Array<{
    meal: keyof typeof dayPlan;
    label: string;
    color: string;
    badgeColor: string;
    badgeTextColor: string;
  }> = [
    {
      meal: 'breakfast',
      label: 'Śniadanie',
      color: '#b59f3b',
      badgeColor: 'bg-yellow-200',
      badgeTextColor: 'text-yellow-900',
    },
    {
      meal: 'lunch',
      label: 'Obiad',
      color: '#3bb54a',
      badgeColor: 'bg-green-200',
      badgeTextColor: 'text-green-900',
    },
    {
      meal: 'dinner',
      label: 'Kolacja',
      color: '#3b6cb5',
      badgeColor: 'bg-blue-200',
      badgeTextColor: 'text-blue-900',
    },
  ];

  // Jeśli weekPlan nadal nie istnieje, pokaż komunikat (to fallback, nie powinno się zdarzyć)
  if (!weekPlan) {
    return (
      <div className="p-4 text-red-600">Brak danych dla wybranego tygodnia. Dodaj tydzień lub odśwież stronę.</div>
    );
  }
  return (
    <div className="space-y-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Szukaj przepisu..."
        className="mb-4"
      />
      <div className="flex flex-col gap-4">
        {mealConfigs.map(({ meal, label, color, badgeColor, badgeTextColor }) => (
          <SectionBox
            key={meal}
            className={`border rounded-md p-2 ${
              meal === 'breakfast'
                ? 'border-yellow-400 bg-yellow-50'
                : meal === 'lunch'
                ? 'border-green-400 bg-green-50'
                : 'border-blue-400 bg-blue-50'
            }`}
          >
            <MealSection
              label={label}
              recipes={availableRecipesMemo[meal] || []}
              badgeColor={badgeColor}
              badgeTextColor={badgeTextColor}
              showTwoColumns={true}
              leftTitle="Wszystkie przepisy"
              rightTitle="Wybrane przepisy"
              onBadgeClick={(recipe) => moveRecipe(meal, recipe, true)}
              selectedRecipes={Array.isArray(dayPlan[meal]) ? dayPlan[meal] : []}
              selectedBadgeColor={badgeColor}
              selectedBadgeTextColor={badgeTextColor}
              onSelectedBadgeClick={(recipe) => moveRecipe(meal, recipe, false)}
            />
          </SectionBox>
        ))}
      </div>
    </div>
  );
};

export default ModalBody;
