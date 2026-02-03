"use client"

import React from "react"
import { Plus, Minus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Ingredient, IngredientCategory } from "@/lib/recipes-data"
import { t } from "i18next"

interface IngredientItemProps {
  ingredient: Ingredient
  quantity?: number
  onAdd?: () => void
  onRemove?: (id?: string) => void
  onQuantityChange?: (quantity: number) => void
  isInCart?: boolean
  isDragging?: boolean
  showQuantityControls?: boolean
  isMobile?: boolean
  refreshIngredients?: () => Promise<void>;
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
  isMobile,
  refreshIngredients,
}: IngredientItemProps) {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [swipeStartX, setSwipeStartX] = React.useState<number | null>(null);
  const [swiped, setSwiped] = React.useState(false);

  // Obsługa gestu przesunięcia w lewo na mobile
  function handleTouchStart(e: React.TouchEvent) {
    if (!isMobile) return;
    setSwipeStartX(e.touches[0].clientX);
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (!isMobile || swipeStartX === null) return;
    const deltaX = e.touches[0].clientX - swipeStartX;
    if (deltaX < -60) setSwiped(true);
    else setSwiped(false);
  }
  function handleTouchEnd() {
    setSwipeStartX(null);
    // Po puszczeniu palca, jeśli był swipe, pokaż przycisk kosza
  }

  function handleDeleteClick(e?: React.MouseEvent) {
    setShowConfirm(true);
    setSwiped(false);
  }
  async function handleConfirmDelete() {
    setShowConfirm(false);
    if (ingredient._id) {
      try {
        const res = await fetch("/api/master-ingredients", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: ingredient._id })
        });
        if (!res.ok) throw new Error("Delete failed");
        if (refreshIngredients) {
          await refreshIngredients();
        }
        if (onRemove) await onRemove();
      } catch (err) {
        // Możesz dodać toast z błędem
      }
    } else {
      if (onRemove) onRemove();
    }
  }
  function handleCancelDelete() {
    setShowConfirm(false);
    setSwiped(false);
  }

  // Make the whole card clickable for adding to cart or removing from cart
  const clickableAdd = onAdd && !isInCart;
  const clickableRemove = onRemove && isInCart;
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (clickableAdd) onAdd && onAdd();
    else if (clickableRemove) onRemove && onRemove(ingredient._id);
  };
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative cursor-pointer",
        "bg-card/50 border-border/50",
        isDragging && "opacity-50 scale-95",
        isInCart && "border-primary/30 bg-primary/5",
        !isInCart && swiped && isMobile && "bg-destructive/10 border-destructive/40",
        (clickableAdd || clickableRemove) && "hover:bg-primary/10 focus:bg-primary/20"
      )}
      onTouchStart={!isInCart ? handleTouchStart : undefined}
      onTouchMove={!isInCart ? handleTouchMove : undefined}
      onTouchEnd={!isInCart ? handleTouchEnd : undefined}
      onClick={handleCardClick}
      tabIndex={clickableAdd || clickableRemove ? 0 : undefined}
      role={(clickableAdd || clickableRemove) ? "button" : undefined}
      aria-label={clickableAdd ? t("Add to cart") : clickableRemove ? t("Remove from cart") : undefined}
    >
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

      {/* Ikona kosza i gest swipe tylko na Wszystkie składniki (nie w koszyku) */}
      {!isInCart && onRemove && (
        <>
          {(isMobile ? swiped : true) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteClick}
              className={cn(
                "h-8 w-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              )}
              aria-label={t("Delete ingredient")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </>
      )}

      {/* Przerzucanie składników między listami */}
      {/* Hide the plus/minus button if the whole card is clickable */}
      {onAdd && !isInCart && !clickableAdd && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onAdd}
          className={cn(
            "h-8 w-8 shrink-0 text-primary hover:text-primary hover:bg-primary/10"
          )}
          aria-label={t("Add to cart")}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
      {onRemove && isInCart && !clickableRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(ingredient._id)}
          className={cn(
            "h-8 w-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          )}
          aria-label={t("Remove from cart")}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}
      {onRemove && isInCart && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(ingredient._id)}
          className={cn(
            "h-8 w-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          )}
          aria-label={t("Remove from cart")}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}

      {/* Kontrolki ilości */}
      {showQuantityControls && onQuantityChange && (
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
      )}

      {/* Modal potwierdzenia usunięcia */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("ingredient.delete_title", "Usuń składnik?")}</DialogTitle>
            <DialogDescription>{t("ingredient.delete_confirm", "Czy na pewno chcesz usunąć ten składnik?")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleConfirmDelete}>{t("ingredient.delete", "Usuń")}</Button>
            <Button variant="outline" onClick={handleCancelDelete}>{t("ingredient.cancel", "Anuluj")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
