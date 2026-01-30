"use client"

import { ChefHat, Pencil, Plus, Trash } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipes-data"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  vegetables: "bg-green-500/15 text-green-400",
  fruits: "bg-pink-500/15 text-pink-400",
  dairy: "bg-sky-500/15 text-sky-400",
  meat: "bg-red-500/15 text-red-400",
  seafood: "bg-cyan-500/15 text-cyan-400",
  grains: "bg-amber-500/15 text-amber-400",
  spices: "bg-orange-500/15 text-orange-400",
	other: "bg-gray-500/15 text-gray-400",
};

interface RecipeCardProps {
  recipe: Recipe;
  onView?: () => void;
  onEdit?: () => void;
  onAddToPlanner?: () => void;
  onDelete?: () => void;
}

export function RecipeCard({ recipe, onEdit, onAddToPlanner, onDelete }: RecipeCardProps) {
  return (
    <Card className="group h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight truncate">
              {recipe.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
              <ChefHat className="h-3.5 w-3.5" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.ingredients.slice(0, 4).map((ing) => (
            <span
              key={ing.id}
              className={cn(
                "inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full",
                categoryColors[ing.category] || categoryColors.other
              )}
            >
              {ing.name}
            </span>
          ))}
          {recipe.ingredients.length > 4 && (
            <span className="inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground">
              +{recipe.ingredients.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex-1 h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddToPlanner}
            className="flex-1 h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="flex-1 h-8 text-xs text-red-500 hover:text-white hover:bg-red-500/80"
            type="button"
            aria-label="Delete recipe"
          >
            <Trash className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
