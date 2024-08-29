import PlannerInitializer from "@/components/planner/PlannerInitializer";
import { getPlanner } from "@/services/planner";
import { getRecipes } from "@/services/recipes";

const Planner = async () => {
  const plannerRaw = await getPlanner();
  const planner = plannerRaw._doc;
  delete planner._id;
  const newPlanner = JSON.parse(JSON.stringify(planner));
  const recipes = await getRecipes();
  const newRecipes = JSON.parse(JSON.stringify(recipes));
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <PlannerInitializer planner={newPlanner} recipes={newRecipes} />
    </div>
  );
};

export default Planner;
