import { NextResponse } from "next/server";
import { fetchMealData } from "@/lib/meal-data-service";
import { fetchRecipes } from "@/lib/recipes-data-service";

export async function GET() {
  // 1. Pobierz wszystkie tygodnie z weekdatas
  const weeks = await fetchMealData();
  // 2. Pobierz wszystkie przepisy
  const recipes = await fetchRecipes();

  // 3. Zbuduj mapę: nazwa składnika -> liczba wystąpień
  const ingredientCount: Record<string, { name: string; category: string; count: number; recipes: string[] }> = {};

  // Pomocnicza mapa przepisów po id
  const recipeMap = new Map<string, typeof recipes[0]>();
  recipes.forEach(r => recipeMap.set(r.id, r));

  // Przejdź przez wszystkie tygodnie, dni i posiłki
  for (const week of weeks) {
    for (const day of week.days) {
      for (const mealType of ["breakfast", "lunch", "dinner"] as const) {
        const meals = day[mealType];
        for (const meal of meals) {
          // meal.id to id przepisu
          const recipe = recipeMap.get(meal.id);
          if (!recipe) continue;
          for (const ingredient of recipe.ingredients) {
            const key = ingredient.name;
            if (!ingredientCount[key]) {
              ingredientCount[key] = {
                name: ingredient.name,
                category: ingredient.category,
                count: 0,
                recipes: [],
              };
            }
            ingredientCount[key].count += 1;
            ingredientCount[key].recipes.push(recipe.name);
          }
        }
      }
    }
  }

  // 4. Zwróć listę składników z liczbą wystąpień
  const shoppingList = Object.values(ingredientCount);
  return NextResponse.json({ success: true, items: shoppingList });
}
