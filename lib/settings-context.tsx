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

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedLanguage = localStorage.getItem("language") as Language | null
    const savedWeeksCount = localStorage.getItem("weeksCount")

    if (savedTheme) {
      setThemeState(savedTheme)
    }
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
    if (savedWeeksCount) {
      const parsed = Number.parseInt(savedWeeksCount, 10) as WeeksCount
      if ([1, 2, 3, 4].includes(parsed)) {
        setWeeksCountState(parsed)
      }
    }
    setMounted(true)
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

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
    i18n.changeLanguage(newLanguage)
  }

  const setWeeksCount = (count: WeeksCount) => {
    setWeeksCountState(count)
    localStorage.setItem("weeksCount", String(count))
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
