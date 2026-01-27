import mongoose from "mongoose";


const mealSchema = new mongoose.Schema({
  breakfast: [String],
  lunch: [String],
  dinner: [String],
}, { _id: false });

const plannerSchema = new mongoose.Schema({
  MON: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  TUE: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  WED: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  THU: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  FRI: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  SAT: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
  SUN: { type: mealSchema, default: () => ({ breakfast: [], lunch: [], dinner: [] }) },
});


export type MealPlan = {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
};

export type Planner = {
  MON: MealPlan;
  TUE: MealPlan;
  WED: MealPlan;
  THU: MealPlan;
  FRI: MealPlan;
  SAT: MealPlan;
  SUN: MealPlan;
};

export default mongoose.models?.planner ||
  mongoose.model("planner", plannerSchema, "planner");
