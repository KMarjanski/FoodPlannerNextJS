import RecipesInitializer from "@/components/recipes/RecipesInitializer";
import { Ingredients as IngredientsModel } from "@/models/ingredients";
import { Recipes as RecipesModel } from "@/models/recipes";
import { getIngredients } from "@/services/ingredients";
import { getRecipes } from "@/services/recipes";

const Recipes = async () => {
  const recipes = await getRecipes();
  const ingredients = await getIngredients();
  const newRecipes = JSON.parse(JSON.stringify(recipes)) as RecipesModel;
  const newIngredients = JSON.parse(
    JSON.stringify(ingredients)
  ) as IngredientsModel;
  return (
    <RecipesInitializer ingredients={newIngredients} recipes={newRecipes} />
  );
};

export default Recipes;
