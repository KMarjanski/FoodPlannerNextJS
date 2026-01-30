"use client"

import type { Recipe } from "@/lib/recipes-data"
import { DayCard } from "./day-card"


interface DayMealsRecipes {
  day: string
  breakfast: Recipe[]
  lunch: Recipe[]
  dinner: Recipe[]
}

interface WeekGridProps {
  weekData: {
    id: string
    label: string
    days: DayMealsRecipes[]
  }
  onEditDay: (day: DayMealsRecipes) => void
}

export function WeekGrid({ weekData, onEditDay }: WeekGridProps) {
  const todayIndex = new Date().getDay()
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {weekData.days.map((day, index) => (
        <DayCard
          key={day.day}
          dayMeals={day}
          isToday={index === adjustedTodayIndex}
          onEdit={() => onEditDay(day)}
        />
      ))}
    </div>
  )
}
