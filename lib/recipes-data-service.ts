import dbConnect from "./mongodb"
import type { Recipe, Ingredient } from "./recipes-data"
import mongoose from "mongoose"

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  category: String,
})

const recipeSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  category: String,
  tags: [String],
  ingredients: [ingredientSchema],
  steps: [String],
  prepTime: Number,
  cookTime: Number,
})

const masterIngredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  category: String,
})

const RecipeModel = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema)
const MasterIngredientModel = mongoose.models.MasterIngredient || mongoose.model("MasterIngredient", masterIngredientSchema)

export async function fetchRecipes(): Promise<Recipe[]> {
  await dbConnect()
  const data = await RecipeModel.find().lean()
  return data as Recipe[]
}

export async function fetchMasterIngredients(): Promise<Ingredient[]> {
  await dbConnect();
  const data = await MasterIngredientModel.find().lean();
  // Convert _id to string and remove any non-plain fields
  return data.map((item: any) => ({
    ...item,
    _id: item._id?.toString?.() ?? undefined,
  })) as Ingredient[];
}

export async function addMasterIngredient({ name, category }: { name: string; category: string }) {
  await dbConnect();
  const newIngredient = await MasterIngredientModel.create({ name, category });
  return newIngredient;
}
