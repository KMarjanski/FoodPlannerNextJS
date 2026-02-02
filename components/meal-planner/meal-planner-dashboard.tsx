"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/components/ui/use-mobile"
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
  lastModified?: string | Date
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
    lastModified: new Date().toISOString(),
  }
}

export function MealPlannerDashboard() {
  const { weeksCount, t } = useSettings()
  const isMobile = useIsMobile()
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
  const [editingWeekLabel, setEditingWeekLabel] = useState<string>("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingWeekId, setEditingWeekId] = useState<string>("")


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

  const handleEditDay = useCallback((day: DayMealsRecipes, weekId: string, weekLabel: string) => {
    setEditingDay(day)
    setEditingWeekLabel(weekLabel)
    setEditingWeekId(weekId)
    setIsEditModalOpen(true)
  }, [])

  const handleSaveDay = useCallback(async () => {
    // Po zamknięciu modalu pobierz świeże dane z API
    await fetch('/api/meal-data')
      .then(res => res.json())
      .then(data => setMealData(data))
      .catch(() => {})
  }, [])
          // Wyznacz, w którym tygodniu powinien być Today
          const todayWeekIndex = useMemo(() => {
            if (!displayedWeeks.length) return -1;
            const firstWeek = displayedWeeks[0];
            if (!firstWeek.lastModified) return -1;
            const lastMod = new Date(firstWeek.lastModified as string);
            const now = new Date();
            lastMod.setHours(0,0,0,0);
            now.setHours(0,0,0,0);
            const diffDays = Math.floor((now.getTime() - lastMod.getTime()) / (1000 * 60 * 60 * 24));
            const weekIdx = Math.floor(diffDays / 7);
            if (weekIdx < 0 || weekIdx >= displayedWeeks.length) return -1;
            return weekIdx;
          }, [displayedWeeks]);

  // Resetuje wszystkie dni w każdym tygodniu
  useEffect(() => {
    const onResetAllDays = async () => {
      const emptyWeeks = displayedWeeks.map((week, i) => ({
        ...week,
        days: week.days.map(day => ({
          ...day,
          breakfast: [],
          lunch: [],
          dinner: [],
        }))
      }))
      await Promise.all(
        emptyWeeks.map(week =>
          fetch("/api/meal-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: week.id, days: week.days })
          })
        )
      )
      setMealData(emptyWeeks)
    }
    window.addEventListener('resetAllDays', onResetAllDays)
    return () => window.removeEventListener('resetAllDays', onResetAllDays)
  }, [displayedWeeks])

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        {/* Przycisk resetowania przeniesiony do DashboardHeader */}
        <main className="px-6 py-6 space-y-10">
          {isMobile ? (
            <>
              <div className="mb-6">
                <Tabs value={activeWeek} onValueChange={setActiveWeek} className="space-y-6">
                  <TabsList className="bg-secondary/50 border border-border p-1 h-auto">
                    {displayedWeeks.map((week, index) => (
                      <TabsTrigger
                        key={week.id}
                        value={week.id}
                        className="px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-md transition-all"
                      >
                        {`${t('Week')} ${index + 1}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {displayedWeeks.map((week, index) => (
                    <TabsContent key={week.id} value={week.id} className="mt-0">
                      <section className="mb-8">
                        <WeekGrid 
                          weekData={week} 
                          onEditDay={(day) => handleEditDay(day, week.id, `${t('Week')} ${index + 1}`)} 
                          showToday={index === todayWeekIndex}
                        />
                      </section>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </>
          ) : (
            displayedWeeks.map((week, index) => (
              <section key={week.id} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{`${t('Week')} ${index + 1}`}</h2>
                <WeekGrid 
                  weekData={week} 
                  onEditDay={(day) => handleEditDay(day, week.id, `${t('Week')} ${index + 1}`)} 
                  showToday={index === todayWeekIndex}
                />
              </section>
            ))
          )}
        </main>
      </div>
      <DayEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        dayMeals={editingDay}
        weekLabel={editingWeekLabel}
        weekIdProp={editingWeekId}
        onSave={handleSaveDay}
      />
    </AppLayout>
  );
}
