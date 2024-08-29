import RecipesInitializer from "@/components/recipes/RecipesInitializer";
import { Recipes as RecipesModel } from "@/models/recipes";
import { getRecipes } from "@/services/recipes";

const Recipes = async () => {
  const recipes = await getRecipes();
  const newRecipes = JSON.parse(JSON.stringify(recipes)) as RecipesModel;
  return <RecipesInitializer recipes={newRecipes} />;
};

export default Recipes;
