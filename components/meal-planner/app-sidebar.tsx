"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSettings } from "@/lib/settings-context"
import { Settings } from "lucide-react"
import { SettingsModal } from "@/components/settings/settings-modal"
import {
  ListTodo,
  CalendarDays,
  ChefHat,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { EggplantIcon } from "@/components/ui/eggplant-icon"

interface NavItem {
  key: "List" | "Planner" | "Recipes" | "Cart"
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const navItems: NavItem[] = [
  { key: "List", icon: ListTodo, href: "/lista" },
  { key: "Planner", icon: CalendarDays, href: "/" },
  { key: "Recipes", icon: ChefHat, href: "/przepisy" },
  { key: "Cart", icon: ShoppingCart, href: "/koszyk" },
]

interface AppSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname()
  const { t } = useSettings()
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col",
          "bg-card/60 backdrop-blur-xl",
          "border-r border-border/50",
          "shadow-[4px_0_24px_-2px_rgba(0,0,0,0.3)]",
          "transition-all duration-300 ease-out",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 px-4 h-16 border-b border-border/50 hover:bg-accent/20 transition-colors">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              {/* Eggplant SVG Icon */}
              <EggplantIcon className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
          </div>
          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            <span className="text-base font-semibold text-foreground whitespace-nowrap">
              {t('MealPlan')}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const label = t(`${item.key}`)

            const navLink = (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg",
                  "transition-all duration-200 ease-out",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                )}

                <div
                  className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-transparent group-hover:bg-accent"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>

                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap transition-all duration-300",
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  {label}
                </span>

                {/* Hover glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.key}>
                  <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return navLink
          })}
        </nav>

        {/* Settings Button */}
        <div className="p-3 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(true)}
            className={cn(
              "w-full h-9 justify-center gap-2 mb-2",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-accent/50 transition-all duration-200"
            )}
          >
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="text-xs">{t('App settings')}</span>}
          </Button>

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "w-full h-9 justify-center gap-2",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-accent/50 transition-all duration-200"
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">{t('Collapse')}</span>
              </>
            )}
          </Button>
        </div>

        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </aside>
    </TooltipProvider>
  )
}
