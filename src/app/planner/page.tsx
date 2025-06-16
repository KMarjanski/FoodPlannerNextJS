import PlannerInitializer from "@features/planner/components/PlannerInitializer";
import { getPlanner } from "@features/planner/service";
import { getRecipes } from "@features/recipes/service";

const Planner = async () => {
  const plannerRaw = await getPlanner();
  const planner = plannerRaw._doc;
  delete planner._id;
  const newPlanner = JSON.parse(JSON.stringify(planner));
  const recipes = await getRecipes();
  const newRecipes = JSON.parse(JSON.stringify(recipes));
  return <PlannerInitializer planner={newPlanner} recipes={newRecipes} />;
};

export default Planner;
