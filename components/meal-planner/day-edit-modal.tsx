"use client"

import React from "react"

import { useState, useCallback, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FoodItem, MealType } from "@/lib/meal-data"
import type { Recipe } from "@/lib/recipes-data"
import type { DayMealsRecipes } from "./meal-planner-dashboard"
import {
  Coffee,
  Sun,
  Moon,
  X,
  GripVertical,
  Check,
  Utensils,
  Search,
  ChefHat,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { t } from "i18next"

// Define missing RecipePickerSheetProps interface
interface RecipePickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (recipe: Recipe) => void;
  mealType: MealType;
}

interface DayEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dayMeals: DayMealsRecipes | null
  onSave: (dayMeals: DayMealsRecipes) => void
}

const mealConfig: Record<
  MealType,
  { label: string; icon: typeof Coffee; iconColor: string; bgColor: string }
> = {
  breakfast: {
    label: "Breakfast",
    icon: Coffee,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  lunch: {
    label: "Lunch",
    icon: Sun,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  dinner: {
    label: "Dinner",
    icon: Moon,
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
  },
}

const categoryColors: Record<FoodItem["category"], string> = {
  protein: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  carb: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  vegetable: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  fruit: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  dairy: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  beverage: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
}

// Map recipe ingredient categories to food item categories
const ingredientToFoodCategory: Record<string, FoodItem["category"]> = {
  vegetables: "vegetable",
  fruits: "fruit",
  dairy: "dairy",
  meat: "protein",
  seafood: "protein",
  grains: "carb",
  spices: "vegetable",
  other: "carb",
}

function RecipePickerSheet({ open, onOpenChange, onSelect, mealType }: RecipePickerSheetProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    if (!open) {
      setSearchQuery("")
    } else {
      fetch("/api/recipes")
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch(() => setRecipes([]))
    }
  }, [open])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const config = mealConfig[mealType as MealType]
  const Icon = config.icon

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg bg-card/98 backdrop-blur-xl border-l border-border/50 p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-xl", config.bgColor)}>
              <Icon className={cn("h-5 w-5", config.iconColor)} />
            </div>
            <div>
              <SheetTitle className="text-lg font-semibold text-foreground">
                Select Recipe
              </SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add a recipe to {config.label.toLowerCase()}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-4 border-b border-border/30 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="pl-10 h-10 bg-secondary/50 border-border/50"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {filteredRecipes.length > 0 ? (
            <div className="space-y-2">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() => {
                    onSelect(recipe)
                    onOpenChange(false)
                  }}
                  className="w-full text-left p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-border/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">
                        {recipe.name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {recipe.ingredients.length} ingredients
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {recipe.ingredients.slice(0, 5).map((ing) => (
                          <span
                            key={ing._id}
                            className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md"
                          >
                            {ing.name}
                          </span>
                        ))}
                        {recipe.ingredients.length > 5 && (
                          <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                            +{recipe.ingredients.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1 text-xs font-medium text-primary">
                        Insert
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <ChefHat className="h-12 w-12 mb-3 opacity-30" />
              <span className="text-sm font-medium">No recipes found</span>
              <span className="text-xs mt-1 opacity-70">Try a different search term</span>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface EditableMealListProps {
  type: MealType
  items: FoodItem[]
  onUpdate: (items: FoodItem[]) => void
  onOpenRecipePicker: () => void
}

function EditableMealList({ type, items, onUpdate, onOpenRecipePicker }: EditableMealListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const config = mealConfig[type]
  const Icon = config.icon

  const handleRemoveItem = useCallback(
    (id: string) => {
      onUpdate(items.filter((item) => item.id !== id))
    },
    [items, onUpdate]
  )

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newItems = [...items]
    const draggedItem = newItems[draggedIndex]
    newItems.splice(draggedIndex, 1)
    newItems.splice(index, 0, draggedItem)
    setDraggedIndex(index)
    onUpdate(newItems)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={cn("p-1.5 rounded-md", config.bgColor)}>
            <Icon className={cn("h-4 w-4", config.iconColor)} />
          </div>
          <span className="text-sm font-medium text-foreground">
            {config.label}
          </span>
          <span className="text-xs text-muted-foreground">
            ({items.length} items)
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenRecipePicker}
          className="h-7 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1.5"
        >
          <ChefHat className="h-3.5 w-3.5" />
          Recipe
        </Button>
      </div>

      <div className="space-y-1.5 min-h-[40px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "group flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-150",
              "bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-border/50",
              draggedIndex === index && "opacity-50 scale-95"
            )}
          >
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded border",
                categoryColors[item.category]
              )}
            >
              {item.category}
            </span>
            <span className="flex-1 text-sm text-foreground">{item.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(item.id)}
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {items.length === 0 && (
          <button
            type="button"
            onClick={onOpenRecipePicker}
            className="w-full flex items-center justify-center gap-2 py-4 text-muted-foreground text-sm rounded-lg border border-dashed border-border/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
          >
            <ChefHat className="h-4 w-4" />
            Select a recipe to add items
          </button>
        )}
      </div>
    </div>
  )
}

export function DayEditModal({
  open,
  onOpenChange,
  dayMeals,
  onSave,
}: DayEditModalProps) {
  const [editedMeals, setEditedMeals] = useState<DayMealsRecipes | null>(null)
  const [recipePickerOpen, setRecipePickerOpen] = useState(false)
  const [recipePickerMealType, setRecipePickerMealType] = useState<MealType>("breakfast")

  useEffect(() => {
    if (dayMeals && open) {
      setEditedMeals(JSON.parse(JSON.stringify(dayMeals)))
    }
  }, [dayMeals, open])

  const handleUpdateMeal = useCallback(
    (type: MealType, items: Recipe[]) => {
      if (!editedMeals) return
      setEditedMeals({
        ...editedMeals,
        [type]: items,
      })
    },
    [editedMeals]
  )

  const handleOpenRecipePicker = useCallback((mealType: MealType) => {
    setRecipePickerMealType(mealType)
    setRecipePickerOpen(true)
  }, [])

  const handleInsertRecipe = useCallback(
    (recipe: Recipe) => {
      if (!editedMeals) return
      setEditedMeals({
        ...editedMeals,
        [recipePickerMealType]: [...editedMeals[recipePickerMealType], recipe],
      })
    },
    [editedMeals, recipePickerMealType]
  )

  const handleSave = useCallback(() => {
    if (editedMeals) {
      onSave(editedMeals)
      onOpenChange(false)
    }
  }, [editedMeals, onSave, onOpenChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleSave()
      }
    },
    [handleSave]
  )

  if (!editedMeals) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[540px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 gap-0 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 bg-gradient-to-b from-secondary/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/15 border border-primary/20">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  {t(editedMeals.day)}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t('Plan your meals for the day')}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 py-5 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* TODO: Replace EditableMealList with a RecipeEditableMealList that works with Recipe[] */}
          </div>

          <div className="px-6 py-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              {t('Cmd/Ctrl + S to save')}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
              >
                {t('Cancel')}
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="h-8 px-4 text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <Check className="h-3.5 w-3.5 mr-1.5" />
                {t('Save Changes')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RecipePickerSheet
        open={recipePickerOpen}
        onOpenChange={setRecipePickerOpen}
        onSelect={handleInsertRecipe}
        mealType={recipePickerMealType}
      />
    </>
  )
}
