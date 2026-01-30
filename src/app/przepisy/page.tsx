import RecipesInitializer from "@features/recipes/components/RecipesInitializer";
import { Recipes as RecipesModel } from "@features/recipes/model";
import { getRecipes } from "@features/recipes/service";
import { Ingredients as IngredientsModel } from "@core/entities/ingredients/model";
import { getIngredients } from "@core/entities/ingredients/service";

export const dynamic = 'force-dynamic';

const Recipes = async () => {
  const recipes = await getRecipes();
  const ingredients = await getIngredients();
  const newRecipes = JSON.parse(JSON.stringify(recipes)) as RecipesModel;
  const newIngredients = JSON.parse(
    JSON.stringify(ingredients)
  ) as IngredientsModel;
  return <RecipesInitializer ingredients={newIngredients} recipes={newRecipes} />;
};

export default Recipes;
