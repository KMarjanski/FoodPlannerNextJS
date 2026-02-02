export type MealType = "breakfast" | "lunch" | "dinner"

export interface FoodItem {
  id: string
  name: string
  category: "protein" | "carb" | "vegetable" | "fruit" | "dairy" | "beverage"
}

export interface DayMeals {
  day: string
  breakfast: FoodItem[]
  lunch: FoodItem[]
  dinner: FoodItem[]
}

export interface WeekData {
  id: string
  label: string
  days: DayMeals[]
  lastModified?: string | Date
}


// Zamiast mocka eksportuj funkcję fetchującą
export { fetchMealData } from "./meal-data-service"
