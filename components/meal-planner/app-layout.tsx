"use client"

import React from "react"

import { useState } from "react"
import { useDeviceType } from "@/hooks/use-device-type"
import { cn } from "@/lib/utils"
import { AppSidebar } from "./app-sidebar"
import { CartProvider } from "@/lib/cart-context"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const deviceType = useDeviceType();
  // SSR: undefined, client: inicjalizacja na podstawie szerokości okna
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const width = window.innerWidth;
    if (width <= 600) return true; // mobile
    if (width <= 1180) return true; // tablet (zwinięty)
    return false; // desktop
  });
  const [sidebarHidden, setSidebarHidden] = useState<boolean | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const width = window.innerWidth;
    if (width <= 600) return true; // mobile
    return false;
  });
  const [hydrated, setHydrated] = useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (deviceType === 'mobile') {
      setSidebarCollapsed(true);
      setSidebarHidden(true);
    } else if (deviceType === 'tablet') {
      setSidebarCollapsed(true);
      setSidebarHidden(false);
    } else if (deviceType === 'desktop') {
      setSidebarCollapsed(false);
      setSidebarHidden(false);
    }
  }, [deviceType]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <div style={!hydrated ? { visibility: 'hidden' } : undefined}>
          {hydrated && typeof sidebarCollapsed !== 'undefined' && typeof sidebarHidden !== 'undefined' && (
            <>
              <AppSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                hidden={sidebarHidden}
                setHidden={setSidebarHidden}
              />
              <main
                className={cn(
                  "transition-all duration-300 ease-out",
                  sidebarHidden
                    ? "ml-0"
                    : (sidebarCollapsed)
                      ? "ml-[72px]"
                      : "ml-[240px]"
                )}
              >
                {children}
              </main>
            </>
          )}
        </div>
      </div>
    </CartProvider>
  )
}
