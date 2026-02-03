"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipes-data"
import { MealSection } from "./meal-section"
import { Plus } from "lucide-react"
import { t } from "i18next"
import React, { useEffect } from "react"


interface DayMealsRecipes {
  day: string
  breakfast: Recipe[]
  lunch: Recipe[]
  dinner: Recipe[]
}

interface DayCardProps {
  dayMeals: DayMealsRecipes
  isToday?: boolean
  onEdit?: () => void
}

export function DayCard({ dayMeals, isToday = false, onEdit }: DayCardProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("DayCard isToday:", { dayName: dayMeals.day, isToday });
  }, [dayMeals.day, isToday]);
  return (
    <Card
      className={`h-full transition-all duration-200 cursor-pointer hover:border-primary/30 ${
        isToday
          ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
          : "bg-card border-border"
      }`}
      onClick={onEdit}
      tabIndex={0}
      role="button"
      aria-label={t('Edit day')}
    >
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-foreground">
            {t(dayMeals.day)}
          </h3>
          {isToday && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded-full">
              {t('Today')}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        <MealSection type="breakfast" recipes={dayMeals.breakfast} />
        <div className="border-t border-border/50" />
        <MealSection type="lunch" recipes={dayMeals.lunch} />
        <div className="border-t border-border/50" />
        <MealSection type="dinner" recipes={dayMeals.dinner} />
      </CardContent>
    </Card>
  );
}
