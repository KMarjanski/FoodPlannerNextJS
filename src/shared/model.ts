import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  inRecipes: Array,
});

export type Ingredients = {
  name: string;
  category: string;
  inRecipes: string[];
}[];

export default mongoose.models.ingredients ||
  mongoose.model("ingredients", ingredientsSchema, "ingredients");

export enum daysOfTheWeek {
  MON = "Monday",
  TUE = "Tuesday",
  WED = "Wednesday",
  THU = "Thursday",
  FRI = "Friday",
  SAT = "Saturday",
  SUN = "Sunday",
}
