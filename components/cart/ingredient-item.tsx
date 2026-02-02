"use client"

import { Plus, Minus, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Ingredient, IngredientCategory } from "@/lib/recipes-data"
import { t } from "i18next"

interface IngredientItemProps {
  ingredient: Ingredient
  quantity?: number
  onAdd?: () => void
  onRemove?: () => void
  onQuantityChange?: (quantity: number) => void
  isInCart?: boolean
  isDragging?: boolean
  showQuantityControls?: boolean
}

const categoryColors: Record<IngredientCategory, string> = {
  fruits: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  vegetables: "bg-green-500/15 text-green-400 border-green-500/20",
  herbs: "bg-lime-500/15 text-lime-400 border-lime-500/20",
  bread: "bg-yellow-800/15 text-yellow-700 border-yellow-800/20",
  pastes: "bg-orange-300/15 text-orange-300 border-orange-300/20",
  jars: "bg-amber-700/15 text-amber-600 border-amber-700/20",
  cans: "bg-gray-400/15 text-gray-500 border-gray-400/20",
  spices: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  sauces: "bg-red-300/15 text-red-400 border-red-300/20",
  "ready-meals": "bg-purple-500/15 text-purple-400 border-purple-500/20",
  dairy: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  frozen: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "dry-goods": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  beverages: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  sweets: "bg-pink-300/15 text-pink-300 border-pink-300/20",
  snacks: "bg-orange-200/15 text-orange-200 border-orange-200/20",
  household: "bg-gray-500/15 text-gray-400 border-gray-500/20",
}

export function IngredientItem({
  ingredient,
  quantity = 1,
  onAdd,
  onRemove,
  onQuantityChange,
  isInCart,
  isDragging,
  showQuantityControls,
}: IngredientItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        "bg-card/50 border-border/50",
        isDragging && "opacity-50 scale-95",
        isInCart && "border-primary/30 bg-primary/5"
      )}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab active:cursor-grabbing shrink-0" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {ingredient.name}
        </p>
        <span
          className={cn(
            "inline-flex px-2 py-0.5 mt-1 text-[10px] font-medium rounded-full border capitalize",
            categoryColors[ingredient.category]
          )}
        >
          {t(ingredient.category)}
        </span>
      </div>

      {showQuantityControls && onQuantityChange ? (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(quantity - 1)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium text-foreground">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={isInCart ? onRemove : onAdd}
          className={cn(
            "h-8 w-8 shrink-0",
            isInCart
              ? "text-destructive hover:text-destructive hover:bg-destructive/10"
              : "text-primary hover:text-primary hover:bg-primary/10"
          )}
        >
          {isInCart ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
}
