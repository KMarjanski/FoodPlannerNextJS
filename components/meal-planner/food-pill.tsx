"use client"

import { cn } from "@/lib/utils"
import type { FoodItem } from "@/lib/meal-data"

interface FoodPillProps {
  item: FoodItem
}

const categoryStyles = {
  protein: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  carb: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  vegetable: "bg-green-500/15 text-green-400 border-green-500/20",
  fruit: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  dairy: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  beverage: "bg-violet-500/15 text-violet-400 border-violet-500/20",
}

export function FoodPill({ item }: FoodPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border transition-all duration-200 hover:scale-105",
        categoryStyles[item.category]
      )}
    >
      {item.name}
    </span>
  )
}
