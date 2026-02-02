"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsModal } from "@/components/settings/settings-modal"
import { useSettings } from "@/lib/settings-context"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"

export function DashboardHeader() {
  const { t } = useSettings()
  const [open, setOpen] = useState(false)

  const handleReset = () => {
    const event = new CustomEvent('resetAllDays')
    window.dispatchEvent(event)
    setOpen(false)
  }

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">
            {t('Weekly Meal Planner')}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
          >
            {t ? t("Clear All") : "Wyczyść wszystkie dni"}
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t ? t("Are you sure you want to clear all days?") : "Czy na pewno chcesz wyczyścić wszystkie dni?"}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground mb-4">
            {t ? t("This action cannot be undone.") : "Tej operacji nie można cofnąć."}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t ? t("Cancel") : "Anuluj"}
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              {t ? t("Clear All") : "Wyczyść wszystkie dni"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
