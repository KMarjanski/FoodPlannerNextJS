import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  inRecipes: Array,
});

export type Ingredient = {
  name: string;
  category: string;
  inRecipes: string[];
};

export type Ingredients = Ingredient[];

export default mongoose.models?.ingredients ||
  mongoose.model("ingredients", ingredientsSchema, "ingredients");
