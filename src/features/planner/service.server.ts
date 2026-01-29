"use server";

import Planner from "@features/planner/model";
import Ingredients from "@core/entities/ingredients/model";

/**
 * Przechodzi przez wszystkie dni i posiłki w plannerze,
 * zbiera wszystkie unikalne składniki (po nazwie) z przepisów,
 * i zwraca tablicę Ingredient[] (pełne obiekty z bazy, nie tylko stringi).
 */
export const generateCartFromPlanner = async () => {
  // Pobierz planner (jeden dokument)
  const plannerDoc = await Planner.findOne();
  if (!plannerDoc) return [];
  // Zamień na plain object
  const planner = JSON.parse(JSON.stringify(plannerDoc));

  // Zbierz wszystkie stringi składników z przepisów
  const dayKeys = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const allIngredients: string[] = [];
  for (const day of dayKeys) {
    const meals = planner[day];
    ["breakfast", "lunch", "dinner"].forEach((mealType) => {
      const recipes = meals[mealType] || [];
      recipes.forEach((recipe: any) => {
        if (Array.isArray(recipe.ingredients)) {
          allIngredients.push(...recipe.ingredients);
        }
      });
    });
  }
  // Unikalne nazwy składników
  const uniqueNames = Array.from(new Set(allIngredients));
  if (uniqueNames.length === 0) return [];

  // Pobierz pełne obiekty Ingredient z bazy po nazwie
  const foundIngredients = await Ingredients.find({ name: { $in: uniqueNames } });
  // Zamień na plain object
  return JSON.parse(JSON.stringify(foundIngredients));
};