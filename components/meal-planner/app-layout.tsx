"use client"

import React from "react"

import { useState } from "react"
import { useIsMobile } from "@/components/ui/use-mobile"
import { cn } from "@/lib/utils"
import { AppSidebar } from "./app-sidebar"
import { CartProvider } from "@/lib/cart-context"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false)

  // Always collapse sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [isMobile])

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar
          collapsed={isMobile ? true : sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          hidden={sidebarHidden}
          setHidden={setSidebarHidden}
        />
        <main
          className={cn(
            "transition-all duration-300 ease-out",
            sidebarHidden
              ? "ml-0"
              : (isMobile || sidebarCollapsed)
                ? "ml-[72px]"
                : "ml-[240px]"
          )}
        >
          {children}
        </main>
      </div>
    </CartProvider>
  )
}
