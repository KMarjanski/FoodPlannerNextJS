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

export default mongoose.models?.planner ||
  mongoose.model("planner", plannerSchema, "planner");
