import PlannerInitializer from "@/components/planner/PlannerInitializer";
import { getPlanner } from "@/services/planner";
import { getRecipes } from "@/services/recipes";

const Planner = async () => {
  const plannerRaw = await getPlanner();
  const planner = plannerRaw._doc;
  delete planner._id;
  const recipes = await getRecipes();
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <PlannerInitializer planner={planner} recipes={recipes} />
    </div>
  );
};

export default Planner;
