import mongoose from "mongoose";

const recipesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  categories: Array,
  ingredients: Array,
});

export default mongoose.models.recipes ||
  mongoose.model("recipes", recipesSchema, "recipes");
