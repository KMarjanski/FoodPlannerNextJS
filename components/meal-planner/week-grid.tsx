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
  let todayIndex = -1;
  let debug = {};
  if (showToday && weekData && (weekData as any).lastModified) {
    const lastMod = new Date((weekData as any).lastModified);
    const now = new Date();
    lastMod.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diffDays = Math.floor((now.getTime() - lastMod.getTime()) / (1000 * 60 * 60 * 24));
    let startIndex = lastMod.getDay();
    startIndex = startIndex === 0 ? 6 : startIndex - 1;
    if (diffDays >= 0 && diffDays < 7) {
      todayIndex = (startIndex + diffDays) % 7;
      if (todayIndex < 0) todayIndex += 7;
    } else {
      todayIndex = -1;
    }
    debug = { lastModified: (weekData as any).lastModified, lastMod: lastMod.toISOString(), today: now.toISOString(), diffDays, startIndex, todayIndex, todayName: weekData.days[todayIndex]?.day };
    // eslint-disable-next-line no-console
    console.log('WEEKGRID DEBUG', debug);
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
