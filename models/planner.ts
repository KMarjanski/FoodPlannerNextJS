import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema({
  MON: Array,
  TUE: Array,
  WED: Array,
  THU: Array,
  FRI: Array,
  SAT: Array,
  SUN: Array,
});

export type Planner = {
  MON: string[];
  TUE: string[];
  WED: string[];
  THU: string[];
  FRI: string[];
  SAT: string[];
  SUN: string[];
};

export default mongoose.models?.planner ||
  mongoose.model("planner", plannerSchema, "planner");
