"use client"

import { Flame, Utensils, Apple, Beef } from "lucide-react"

const stats = [
  { icon: Flame, label: "Calories", value: "14,200", color: "text-orange-400" },
  { icon: Beef, label: "Protein", value: "420g", color: "text-emerald-400" },
  { icon: Apple, label: "Carbs", value: "1,680g", color: "text-amber-400" },
  { icon: Utensils, label: "Meals", value: "21", color: "text-sky-400" },
]

export function StatsBar() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-1.5">
          <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
          <span className="font-medium text-foreground">{stat.value}</span>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
