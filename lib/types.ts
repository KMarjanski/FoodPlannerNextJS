// Główne typy dla aplikacji FoodPlanner

export type IngredientCategory =
  | 'fruits'
  | 'vegetables'
  | 'herbs'
  | 'bread'
  | 'pastes'
  | 'jars'
  | 'cans'
  | 'spices'
  | 'sauces'
  | 'ready-meals'
  | 'dairy'
  | 'frozen'
  | 'dry-goods'
  | 'beverages'
  | 'sweets'
  | 'snacks'
  | 'household'

export interface Ingredient {
  id: string
  name: string
  category: IngredientCategory
}

export type RecipeCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'dessert'
  | 'appetizer'

export interface Recipe {
  id: string
  name: string
  category: RecipeCategory
  ingredients: Ingredient[]
}
