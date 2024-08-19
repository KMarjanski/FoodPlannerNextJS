"use server";

import Planner from "@/models/planner";

const getPlanner = async () => {
  return Planner.find();
};

const setPlanner = async () => {
  const MON = "MON";
  const TUE = "TUE";
  const WED = "WED";
  const THU = "THU";
  const FRI = "FRI";
  const SAT = "SAT";
  const SUN = "SUN";
  const newPlanner = new Planner({ MON, TUE, WED, THU, FRI, SAT, SUN });
  return newPlanner.save();
};

export { getPlanner, setPlanner };
