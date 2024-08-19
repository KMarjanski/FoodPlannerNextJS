import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema({
  MON: String,
  TUE: String,
  WED: String,
  THU: String,
  FRI: String,
  SAT: String,
  SUN: String,
});

export default mongoose.models?.planner ||
  mongoose.model("planner", plannerSchema, "planner");
