"use server";

import Planner, { Planner as PlannerModel } from "@features/planner/model";


const getPlanner = async () => {
  const doc = await Planner.findOne();
  if (!doc) return null;
  // Zamiana na plain object
  return JSON.parse(JSON.stringify(doc));
};

const setPlanner = async (newPlanner: PlannerModel) => {
  const doc = await Planner.findOneAndReplace({}, newPlanner, { returnNewDocument: false });
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
};

export { getPlanner, setPlanner };
