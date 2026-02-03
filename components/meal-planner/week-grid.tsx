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

// Usunięto duplikat definicji WeekGrid
export function WeekGrid({ weekData, onEditDay, showToday }: WeekGridProps & { showToday?: boolean }) {
  // Wyznacz "Today" tylko jeśli showToday=true
  // Wyznacz todayIndex na podstawie showToday przekazanego z dashboardu
  let todayIndex = -1;
  if (showToday) {
    // Dzień "dzisiaj" wyznacza dashboard, tu tylko przekazujemy index
    todayIndex = new Date().getDay() - 1;
    if (todayIndex < 0) todayIndex = 6;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {weekData.days.map((day, index) => (
        <DayCard
          key={day.day}
          dayMeals={day}
          isToday={showToday && index === todayIndex}
          onEdit={() => onEditDay(day)}
        />
      ))}
    </div>
  )
}
