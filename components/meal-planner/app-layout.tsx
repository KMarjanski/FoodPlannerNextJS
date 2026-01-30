"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AppSidebar } from "./app-sidebar"
import { CartProvider } from "@/lib/cart-context"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={cn(
            "transition-all duration-300 ease-out",
            sidebarCollapsed ? "ml-[72px]" : "ml-[240px]"
          )}
        >
          {children}
        </main>
      </div>
    </CartProvider>
  )
}
