"use client"

import type { MealType } from "@/lib/meal-data"
import type { Recipe } from "@/lib/recipes-data"
import { ChevronDown, ChevronUp, Coffee, Sun, Moon } from "lucide-react"
import { useState } from "react"

interface MealSectionProps {
  type: MealType
  recipes: Recipe[]
}

const mealConfig = {
  breakfast: {
    label: "Breakfast",
    icon: Coffee,
    iconColor: "text-amber-400",
  },
  lunch: {
    label: "Lunch",
    icon: Sun,
    iconColor: "text-yellow-400",
  },
  dinner: {
    label: "Dinner",
    icon: Moon,
    iconColor: "text-indigo-400",
  },
}

export function MealSection({ type, recipes }: MealSectionProps) {
  const config = mealConfig[type]
  const Icon = config.icon
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${config.iconColor}`} />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {config.label}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {safeRecipes.length === 0 && (
          <span className="text-xs text-muted-foreground">No recipes</span>
        )}
        {safeRecipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-lg bg-secondary/40 px-3 py-2">
            <span className="font-medium text-sm truncate">{recipe.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
