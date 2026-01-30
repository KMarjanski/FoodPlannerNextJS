"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsModal } from "@/components/settings/settings-modal"
import { useSettings } from "@/lib/settings-context"

export function DashboardHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { t } = useSettings()

  return (
    <>
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              {t('Weekly Meal Planner')}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
