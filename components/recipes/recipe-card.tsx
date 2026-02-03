"use client"

import { ChefHat, Pencil, Plus, Trash } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipes-data"
import { cn } from "@/lib/utils"
import { t } from "i18next"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

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
    <Card className="group h-full flex flex-col bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 justify-between">
              <h3 className="font-semibold text-foreground text-base leading-tight truncate">
                {recipe.name}
              </h3>
              <span className="inline-block px-2 py-0.5 rounded bg-secondary/40 border border-border/40 font-medium text-xs whitespace-nowrap ml-2">
                {t(recipe.category)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
              <ChefHat className="h-3.5 w-3.5" />
              <span>{recipe.ingredients.length} {t('Ingredients')}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4 flex flex-col flex-1">
        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.ingredients.slice(0, 4).map((ing) => (
            <span
              key={ing.id || ing._id || ing.name}
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

        <div className="flex items-center gap-2 pt-2 border-t border-border/50 mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex-1 h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            {t('Edit')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddToPlanner}
            className="flex-1 h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            {t('Copy')}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 h-8 text-xs text-red-500 hover:text-white hover:bg-red-500/80"
                type="button"
                aria-label="Delete recipe"
              >
                <Trash className="h-3.5 w-3.5 mr-1.5" />
                {t('Delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('Delete recipe?')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('Are you sure you want to delete this recipe? This action cannot be undone.')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('Cancel', { defaultValue: 'Anuluj' })}</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>{t('Delete', { defaultValue: 'Usuń' })}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
