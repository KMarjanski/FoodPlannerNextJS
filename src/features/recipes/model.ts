import mongoose from "mongoose";

const recipesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: Array,
});

export type Recipes = {
  name: string;
  ingredients: string[];
}[];

export type Recipe = {
  name: string;
  ingredients: string[];
};

export default mongoose.models.recipes ||
  mongoose.model("recipes", recipesSchema, "recipes");
