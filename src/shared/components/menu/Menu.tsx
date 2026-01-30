
"use client";

import Link from "next/link";
import AddButtons from "./additionalButtons/addButtons";
import Text from "../topography/Text";
import { usePathname } from "next/navigation";
import { ListTodo, CalendarDays, ChefHat, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/shared/lib/utils";

const navItems = [
  { label: "Lista", icon: ListTodo, href: "/lista" },
  { label: "Planer", icon: CalendarDays, href: "/planer" },
  { label: "Przepisy", icon: ChefHat, href: "/przepisy" },
  { label: "Koszyk", icon: ShoppingCart, href: "/koszyk" },
];


const Menu = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-[72px]" : "w-56"} shadow-xl border-r`}
      style={{
        background: '#040404',
        color: 'var(--color-sidebar-foreground)',
        borderColor: 'var(--color-sidebar-border)',
      }}
    >
      {/* Logo Section */}
      <div
        className="flex items-center gap-3 px-4 h-16 border-b"
        style={{ borderColor: 'var(--color-sidebar-border)' }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-lime-400 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
            <path d="M12 2c-2.76 0-5 4.48-5 10s2.24 10 5 10" />
            <path d="M2 12h10" />
          </svg>
        </div>
        <span className={`font-bold text-2xl text-green-600 tracking-tight select-none transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>Jedzonko</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 space-y-1">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.label} className="relative">
                <a
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-out select-none",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  )}

                  <div
                    className={cn(
                      "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-transparent group-hover:bg-accent"
                    )}
                  >
                    <Icon className={cn(
                      "w-[18px] h-[18px] transition-colors duration-200",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    )} />
                  </div>

                  <span
                    className={cn(
                      "text-sm font-medium whitespace-nowrap transition-all duration-300",
                      collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Hover glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Collapse Toggle */}
      <div className="flex justify-center pb-4 mt-auto">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center gap-2 rounded-full shadow-lg border transition-all duration-200 w-9 h-9"
          style={{
            background: 'var(--color-sidebar-accent)',
            color: 'var(--color-sidebar-accent-foreground)',
            borderColor: 'var(--color-sidebar-border)',
          }}
          aria-label="Zwiń menu"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
};

export default Menu;
