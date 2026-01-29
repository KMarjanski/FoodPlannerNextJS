import mongoose from "mongoose";



const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  // Pozwól na dodatkowe pola, np. kategorie, type, __v
  categories: { type: [String], required: false },
  type: { type: String, required: false },
  __v: { type: Number, required: false },
}, { _id: false });

const mealSchema = new mongoose.Schema({
  breakfast: [recipeSchema],
  lunch: [recipeSchema],
  dinner: [recipeSchema],
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



import type { Recipe } from "@features/recipes/model";

export type MealPlan = {
  breakfast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
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
