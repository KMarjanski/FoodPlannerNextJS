import mongoose from "mongoose";

const recipesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: Array,
});

export type Recipe = {
  name: string;
  ingredients: string[];
};

export type Recipes = Recipe[];

export default mongoose.models.recipes ||
  mongoose.model("recipes", recipesSchema, "recipes");
