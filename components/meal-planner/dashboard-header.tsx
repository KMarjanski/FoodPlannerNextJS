"use client"
import * as React from "react"
import { useState } from "react"
import { Settings, CalendarDays } from "lucide-react"
import { useDeviceType } from '@/hooks/use-device-type'
import { Button } from "@/components/ui/button"
import { SettingsModal } from "@/components/settings/settings-modal"
import { useSettings } from "@/lib/settings-context"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"

export function DashboardHeader({
  tabsList
}: {
  tabsList?: React.ReactNode
}) {
  const { t } = useSettings()
  const [open, setOpen] = useState(false)
  const deviceType = useDeviceType()

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
              {deviceType !== 'mobile' && <CalendarDays className="h-5 w-5 text-primary" />}
              <span className={deviceType === 'mobile' ? 'ml-13' : ''}>{t('Weekly Meal Planner')}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className={deviceType === 'mobile' ? 'ml-13' : ''}>{t('Plan your meals for the week')}</span>
            </p>
          </div>
          {/* Desktop: TabsList and button in a row. Mobile: TabsList in one row, button in another row below. */}
          {deviceType === 'mobile' ? (
            <>
              <div className="flex flex-row items-center gap-4 sm:gap-6 w-full">{/* Force TabsList to full width on mobile */}
                {tabsList && React.isValidElement(tabsList)
                  ? React.cloneElement(
                      tabsList as React.ReactElement<any>,
                      {
                        className: ((tabsList as any).props?.className ?? '') + ' w-full'
                      }
                    )
                  : tabsList}
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-6 w-full mt-2">
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full"
                >
                  {t ? t("Clear All") : "Wyczyść wszystkie dni"}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center gap-4 sm:gap-6">
              {tabsList}
              <Button
                onClick={() => setOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {t ? t("Clear All") : "Wyczyść wszystkie dni"}
              </Button>
            </div>
          )}
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
