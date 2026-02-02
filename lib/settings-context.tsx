"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
type Language = 'en' | 'pl'
import { useTranslation } from "../lib/i18n"

type Theme = "light" | "dark"
type WeeksCount = 1 | 2 | 3 | 4


interface SettingsContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (language: Language) => void
  weeksCount: WeeksCount
  setWeeksCount: (count: WeeksCount) => void
  t: any // z useTranslation
}


const SettingsContext = createContext<SettingsContextType | undefined>(undefined)


export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [language, setLanguageState] = useState<Language>("pl")
  const [weeksCount, setWeeksCountState] = useState<WeeksCount>(2)
  const [mounted, setMounted] = useState(false)
  const { t, i18n } = useTranslation("common")

  // Pobierz ustawienia z API na start
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          if (data.theme) setThemeState(data.theme)
          if (data.language) {
            setLanguageState(data.language)
            i18n.changeLanguage(data.language)
          }
          if (data.weeksCount && [1,2,3,4].includes(data.weeksCount)) setWeeksCountState(data.weeksCount)
        }
      } catch (e) {
        // fallback: nie zmieniaj domyślnych
      }
      setMounted(true)
    }
    fetchSettings()
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme, mounted])

  // Zapisz ustawienia do API
  const saveSettings = async (next: Partial<{theme: Theme, language: Language, weeksCount: WeeksCount}>) => {
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: next.theme ?? theme,
          language: next.language ?? language,
          weeksCount: next.weeksCount ?? weeksCount
        })
      })
    } catch (e) {}
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    saveSettings({ theme: newTheme })
  }

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    i18n.changeLanguage(newLanguage)
    saveSettings({ language: newLanguage })
  }

  const setWeeksCount = (count: WeeksCount) => {
    setWeeksCountState(count)
    saveSettings({ weeksCount: count })
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <SettingsContext.Provider
        value={{
          theme: "dark",
          setTheme,
          language: "en",
          setLanguage,
          weeksCount: 2,
          setWeeksCount,
          t,
        }}
      >
        {children}
      </SettingsContext.Provider>
    );
  }

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, weeksCount, setWeeksCount, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
