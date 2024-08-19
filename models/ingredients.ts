import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  inRecipes: Array,
});

export default mongoose.models.ingredients ||
  mongoose.model("ingredients", ingredientsSchema, "ingredients");
