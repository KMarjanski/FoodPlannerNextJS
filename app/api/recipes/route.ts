export async function PUT(req) {
  await dbConnect()
  const body = await req.json()
  const { id, ...update } = body
  // Formatowanie nazwy przepisu: pierwsza litera duża, reszta małe
  if (update.name && typeof update.name === 'string') {
    update.name = update.name.charAt(0).toUpperCase() + update.name.slice(1).toLowerCase();
  }
  const updated = await RecipeModel.findOneAndUpdate({ id }, update, { new: true })
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req) {
  await dbConnect()
  const { id } = await req.json()
  const deleted = await RecipeModel.findOneAndDelete({ id })
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
import { NextResponse } from "next/server"
import { fetchRecipes } from "@/lib/recipes-data-service"
import dbConnect from "@/lib/mongodb"
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

const RecipeModel = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema)

export async function GET() {
  const data = await fetchRecipes()
  return NextResponse.json(data)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  // Formatowanie nazwy przepisu: pierwsza litera duża, reszta małe
  if (body.name && typeof body.name === 'string') {
    body.name = body.name.charAt(0).toUpperCase() + body.name.slice(1).toLowerCase();
  }
  const recipe = await RecipeModel.create(body)
  return NextResponse.json(recipe, { status: 201 })
}
