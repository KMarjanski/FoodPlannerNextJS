"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipes-data"
import { MealSection } from "./meal-section"
import { Plus } from "lucide-react"
import { t } from "i18next"


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
  return (
    <Card
      className={`h-full transition-all duration-200 hover:border-primary/30 group ${
        isToday
          ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
          : "bg-card border-border"
      }`}
    >
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
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
  )
}
