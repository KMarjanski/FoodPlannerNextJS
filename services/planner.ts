"use server";

import Planner, { Planner as PlannerModel } from "@/models/planner";

const getPlanner = async () => {
  return Planner.findOne();
};

const setPlanner = (newPlanner: PlannerModel) => {
  Planner.findOneAndReplace({}, newPlanner, { returnNewDocument: false }).then(
    (x) => x
  );
};

export { getPlanner, setPlanner };
