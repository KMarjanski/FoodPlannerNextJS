"use client"

import { useState } from "react"
import { Settings, CalendarDays } from "lucide-react"
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from "@/components/ui/button"
import { SettingsModal } from "@/components/settings/settings-modal"
import { useSettings } from "@/lib/settings-context"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"

export function DashboardHeader() {
  const { t } = useSettings()
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleReset = () => {
    const event = new CustomEvent('resetAllDays')
    window.dispatchEvent(event)
    setOpen(false)
  }

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
              {!isMobile && <CalendarDays className="h-5 w-5 text-primary" />}
              <span className={isMobile ? 'ml-14' : ''}>{t('Weekly Meal Planner')}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className={isMobile ? 'ml-14' : ''}>{t('Plan your meals for the week')}</span>
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
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
