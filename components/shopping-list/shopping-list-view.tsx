"use client"

import { useState, useMemo } from "react"
import {
  Check,
  ChevronDown,
  ChevronRight,
  ListChecks,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AppLayout } from "@/components/meal-planner/app-layout"
import type { IngredientCategory } from "@/lib/recipes-data"
import { ingredientCategories } from "@/lib/recipes-data"
import { useCart } from "@/lib/cart-context"

interface ShoppingItem {
  id: string
  name: string
  quantity: number
  category: IngredientCategory
  checked: boolean
}


const categoryColors: Record<IngredientCategory, string> = {
  vegetables: "bg-green-500/15 text-green-400 border-green-500/30",
  fruits: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  dairy: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  meat: "bg-red-500/15 text-red-400 border-red-500/30",
  seafood: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  grains: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  spices: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  other: "bg-gray-500/15 text-gray-400 border-gray-500/30",
}

interface ShoppingItemRowProps {
  item: ShoppingItem
  onToggle: () => void
}

function ShoppingItemRow({ item, onToggle }: ShoppingItemRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200",
        "bg-card/30 border-border/30 hover:border-primary/30",
        item.checked && "opacity-60"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center h-6 w-6 rounded-md border-2 transition-all duration-200 shrink-0",
          item.checked
            ? "bg-primary border-primary"
            : "border-border/50 hover:border-primary/50"
        )}
      >
        {item.checked && <Check className="h-4 w-4 text-primary-foreground" />}
      </div>

      <span
        className={cn(
          "flex-1 text-left text-sm font-medium transition-all duration-200",
          item.checked ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {item.name}
      </span>

      <Badge
        variant="secondary"
        className="text-xs bg-secondary/80 text-secondary-foreground"
      >
        {item.quantity}
      </Badge>
    </button>
  )
}

interface CategorySectionProps {
  category: IngredientCategory
  items: ShoppingItem[]
  onToggleItem: (id: string) => void
  isExpanded: boolean
  onToggleExpand: () => void
}

function CategorySection({
  category,
  items,
  onToggleItem,
  isExpanded,
  onToggleExpand,
}: CategorySectionProps) {
  const completedCount = items.filter((item) => item.checked).length
  const categoryLabel = ingredientCategories.find((c) => c.value === category)?.label

  return (
    <Card className={cn("border transition-all duration-200", categoryColors[category])}>
      <CardHeader className="p-0">
        <button
          type="button"
          onClick={onToggleExpand}
          className="w-full flex items-center justify-between p-4 hover:bg-accent/20 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-semibold text-foreground">{categoryLabel}</span>
            <Badge
              variant="secondary"
              className="text-xs bg-secondary/50 text-muted-foreground"
            >
              {completedCount}/{items.length}
            </Badge>
          </div>
          <div className="h-1.5 w-24 rounded-full bg-secondary/50 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </button>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0 space-y-2">
          {items.map((item) => (
            <ShoppingItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
            />
          ))}
        </CardContent>
      )}
    </Card>
  )
}

export function ShoppingListView() {
  const { cartItems } = useCart()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(ingredientCategories.map((c) => c.value))
  )

  // Transform cartItems to ShoppingItem[] (read-only, checked always false)
  const items: ShoppingItem[] = useMemo(() =>
    cartItems.map((item) => ({
      ...item,
      checked: false,
    })),
    [cartItems]
  )

  const groupedItems = useMemo(() => {
    const groups: Record<IngredientCategory, ShoppingItem[]> = {
      vegetables: [],
      fruits: [],
      dairy: [],
      meat: [],
      seafood: [],
      grains: [],
      spices: [],
      other: [],
    }
    items.forEach((item) => {
      groups[item.category].push(item)
    })
    return groups
  }, [items])

  const totalItems = items.length
  const completedItems = items.filter((item) => item.checked).length
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  // Read-only: no toggling, no clear/reset
  const handleToggleItem = () => {}
  const handleToggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  return (
    <>
      {/* Sticky Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                Shopping List
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {completedItems} of {totalItems} items completed
              </p>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Your list is empty
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                Add items from the cart builder to get started
              </p>
              <Button
                variant="default"
                onClick={() => (window.location.href = "/koszyk")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Go to Cart Builder
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl mx-auto">
              {Object.entries(groupedItems).map(([category, categoryItems]) => {
                if (categoryItems.length === 0) return null
                return (
                  <CategorySection
                    key={category}
                    category={category as IngredientCategory}
                    items={categoryItems}
                    onToggleItem={handleToggleItem}
                    isExpanded={expandedCategories.has(category)}
                    onToggleExpand={() => handleToggleCategory(category)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </>
  )
}
