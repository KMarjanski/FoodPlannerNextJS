"use client"

import { Moon, Sun, Languages, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSettings } from "@/lib/settings-context"
import { cn } from "@/lib/utils"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { theme, setTheme, language, setLanguage, weeksCount, setWeeksCount, t } = useSettings()
  
  const weeksOptions = [1, 2, 3, 4] as const

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            {t('App settings')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Appearance Section */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {t('Appearance')}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200",
                  theme === "light"
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Sun className="h-4 w-4" />
                <span className="text-sm font-medium">{t('Light')}</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200",
                  theme === "dark"
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Moon className="h-4 w-4" />
                <span className="text-sm font-medium">{t('Dark')}</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Language Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {t('Language')}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("pl")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200",
                  language === "pl"
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span className="text-base">PL</span>
                <span className="text-sm font-medium">Polski</span>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200",
                  language === "en"
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span className="text-base">EN</span>
                <span className="text-sm font-medium">English</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Weeks Count Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {t('Weeks Count')}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {weeksOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setWeeksCount(count)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg border transition-all duration-200",
                    weeksCount === count
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <span className="text-lg font-semibold">{count}</span>
                        <span className="text-xs">{count === 1 ? t('Week') : t('Weeks')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
