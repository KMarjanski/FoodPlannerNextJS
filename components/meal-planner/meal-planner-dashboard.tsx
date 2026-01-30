"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Pobieranie danych przez API
import type { Recipe } from "@/lib/recipes-data"

// Local types for recipe-based planner
export interface DayMealsRecipes {
  day: string
  breakfast: Recipe[]
  lunch: Recipe[]
  dinner: Recipe[]
}

export interface WeekDataRecipes {
  id: string
  label: string
  days: DayMealsRecipes[]
}
import { DashboardHeader } from "./dashboard-header"
import { WeekGrid } from "./week-grid"
import { AppLayout } from "./app-layout"
import { DayEditModal } from "./day-edit-modal"
import { useSettings } from "@/lib/settings-context"

// Template for generating empty week data
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function generateEmptyWeek(weekNumber: number): WeekDataRecipes {
  return {
    id: `week-${weekNumber}`,
    label: `Week ${weekNumber}`,
    days: dayNames.map((day) => ({
      day,
      breakfast: [],
      lunch: [],
      dinner: [],
    })),
  }
}

export function MealPlannerDashboard() {
  const { weeksCount, t } = useSettings()
  const [mealData, setMealData] = useState<WeekDataRecipes[]>([])
    // Pobierz dane z API na start
    useEffect(() => {
      fetch("/api/meal-data")
        .then((res) => res.json())
        .then((data) => setMealData(data))
        .catch(() => setMealData([]))
    }, [])
  const [activeWeek, setActiveWeek] = useState(mealData[0]?.id || "week-1")
  const [editingDay, setEditingDay] = useState<DayMealsRecipes | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Generate weeks based on setting
  const displayedWeeks = useMemo(() => {
    const weeks: WeekDataRecipes[] = []
    for (let i = 1; i <= weeksCount; i++) {
      const existingWeek = mealData.find((w) => w.id === `week-${i}`)
      if (existingWeek) {
        weeks.push(existingWeek)
      } else {
        weeks.push(generateEmptyWeek(i))
      }
    }
    return weeks
  }, [weeksCount, mealData])

  // Reset active week if it no longer exists
  useEffect(() => {
    if (!displayedWeeks.find((w) => w.id === activeWeek)) {
      setActiveWeek(displayedWeeks[0]?.id || "week-1")
    }
  }, [displayedWeeks, activeWeek])

  const handleEditDay = useCallback((day: DayMealsRecipes) => {
    setEditingDay(day)
    setIsEditModalOpen(true)
  }, [])

  const handleSaveDay = useCallback((updatedDay: DayMealsRecipes) => {
    setMealData((prevData) =>
      prevData.map((week) => ({
        ...week,
        days: week.days.map((day) =>
          day.day === updatedDay.day ? updatedDay : day
        ),
      }))
    )
  }, [])

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <main className="px-6 py-6">
          <Tabs value={activeWeek} onValueChange={setActiveWeek} className="space-y-6">
            <TabsList className="bg-secondary/50 border border-border p-1 h-auto">
              {displayedWeeks.map((week, index) => (
                <TabsTrigger
                  key={week.id}
                  value={week.id}
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-md transition-all"
                >
                  {t.planner[`week${index + 1}` as keyof typeof t.planner] || `Week ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>

            {displayedWeeks.map((week) => (
              <TabsContent key={week.id} value={week.id} className="mt-0">
                <WeekGrid weekData={week} onEditDay={handleEditDay} />
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>

      <DayEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        dayMeals={editingDay}
        onSave={handleSaveDay}
      />
    </AppLayout>
  )
}
