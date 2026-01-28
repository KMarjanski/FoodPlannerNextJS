import PlannerInitializer from "@features/planner/components/PlannerInitializer";
import { getPlanner } from "@features/planner/service";
import { getRecipes } from "@features/recipes/service";

export const dynamic = 'force-dynamic';

const Planner = async () => {
  const plannerRaw = await getPlanner();
  if (!plannerRaw) throw new Error("Planner not found");
  const { _id, ...planner } = plannerRaw;
  const newPlanner = JSON.parse(JSON.stringify(planner));
  const recipes = await getRecipes();
  const newRecipes = JSON.parse(JSON.stringify(recipes));
  return <PlannerInitializer planner={newPlanner} recipes={newRecipes} />;
};

export default Planner;
