
import { NextResponse } from "next/server";
import { fetchMealData } from "@/lib/meal-data-service";
import { fetchRecipes } from "@/lib/recipes-data-service";
import { getCartCollection } from "@/lib/cart-db";

export async function GET() {
  // 1. Pobierz składniki z carts
  const collection = await getCartCollection();
  const lastCart = await collection.find().sort({ createdAt: -1 }).limit(1).toArray();
  const cartItems = lastCart.length > 0 && Array.isArray(lastCart[0].items) ? lastCart[0].items : [];

  // 2. Pobierz dane z weekdatas i recipes
  const weeks = await fetchMealData();
  const recipes = await fetchRecipes();

  // 3. Zbuduj mapę: nazwa składnika -> liczba wystąpień w przepisach
  const ingredientCount: Record<string, { count: number; recipes: string[] }> = {};
  const recipeMap = new Map<string, typeof recipes[0]>();
  recipes.forEach(r => recipeMap.set(r.id, r));

  for (const week of weeks) {
    for (const day of week.days) {
      for (const mealType of ["breakfast", "lunch", "dinner"] as const) {
        const meals = day[mealType];
        for (const meal of meals) {
          const recipe = recipeMap.get(meal.id);
          if (!recipe) continue;
          for (const ingredient of recipe.ingredients) {
            const key = ingredient.name;
            if (!ingredientCount[key]) {
              ingredientCount[key] = { count: 0, recipes: [] };
            }
            ingredientCount[key].count += 1;
            ingredientCount[key].recipes.push(recipe.name);
          }
        }
      }
    }
  }

  // 4. Zbuduj listę zakupów na podstawie carts
  const shoppingList = cartItems.map((item: any) => {
    const info = ingredientCount[item.name] || { count: 0, recipes: [] };
    return {
      name: item.name,
      category: item.category,
      count: info.count,
      recipes: info.recipes,
    };
  });

  return NextResponse.json({ success: true, items: shoppingList });
}
