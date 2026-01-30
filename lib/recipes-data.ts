export interface Recipe {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  ingredients: Ingredient[]
  steps: string[]
  prepTime: number
  cookTime: number
}

import type { Ingredient, IngredientCategory } from "./types"

export const ingredientCategories: { value: IngredientCategory; label: string }[] = [
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "herbs", label: "Herbs" },
  { value: "bread", label: "Bread" },
  { value: "pastes", label: "Pastes" },
  { value: "jars", label: "Jars" },
  { value: "cans", label: "Cans" },
  { value: "spices", label: "Spices" },
  { value: "sauces", label: "Sauces" },
  { value: "ready-meals", label: "Ready Meals" },
  { value: "dairy", label: "Dairy" },
  { value: "frozen", label: "Frozen" },
  { value: "dry-goods", label: "Dry Goods" },
  { value: "beverages", label: "Beverages" },
  { value: "sweets", label: "Sweets" },
  { value: "snacks", label: "Snacks" },
  { value: "household", label: "Household" },
]

export const recipeCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Appetizer",
]

export const recipeTags = [
  "Quick",
  "Healthy",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Low-Carb",
  "High-Protein",
  "Comfort Food",
]


// Zamiast mocków eksportuj funkcje fetchujące

