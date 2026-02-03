"use client"

import React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import { X, Plus, Check, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal } from "lucide-react"
import {
  type Recipe,
  type Ingredient,
  ingredientCategories,
  recipeCategories,
} from "@/lib/recipes-data"
import { cn } from "@/lib/utils"
import { t } from "i18next"

interface AddRecipeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (recipe: Recipe) => void
  editRecipe?: Recipe | null
  originalRecipe?: Recipe | null
}

const categoryColors: Record<string, string> = {
  vegetables: "bg-green-500/20 text-green-400 border-green-500/30",
  fruits: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  dairy: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  meat: "bg-red-500/20 text-red-400 border-red-500/30",
  seafood: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  grains: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  spices: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

export function AddRecipeModal({
  open,
  onOpenChange,
  onSave,
  editRecipe,
  originalRecipe,
}: AddRecipeModalProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  useEffect(() => {
    if (!open) setShowAllCategories(false);
  }, [open]);
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [customIngredientName, setCustomIngredientName] = useState("")
  const [customIngredientAmount, setCustomIngredientAmount] = useState("")
  const [customIngredientCategory, setCustomIngredientCategory] = useState("other")
  const [category, setCategory] = useState(recipeCategories[0])
  const [showCustomForm, setShowCustomForm] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editRecipe) {
      setName(editRecipe.name)
      setIngredients(editRecipe.ingredients)
      setCategory(editRecipe.category || recipeCategories[0])
    } else {
      resetForm()
    }
  }, [editRecipe, open])

  // For copy: only if originalRecipe is provided and editRecipe is not
  const isCopy = !!originalRecipe && !editRecipe
  const isNameDifferent = isCopy ? name.trim() !== originalRecipe.name.trim() : true
  const areIngredientsDifferent = isCopy ? JSON.stringify(ingredients.map(i => ({ name: i.name, amount: i.amount, category: i.category }))) !== JSON.stringify(originalRecipe.ingredients.map(i => ({ name: i.name, amount: i.amount, category: i.category }))) : true
  const canSave = name.trim().length >= 3 && ingredients.length >= 2 && (!isCopy || (isNameDifferent && areIngredientsDifferent))



  const resetForm = () => {
    setName("")
    setIngredients([])
    setSearchQuery("")
    setShowSuggestions(false)
    setCustomIngredientName("")
    setCustomIngredientAmount("")
    setCustomIngredientCategory("other")
    setShowCustomForm(false)
    setCategory(recipeCategories[0])
  }

  const [masterIngredients, setMasterIngredients] = useState<Ingredient[]>([])
  useEffect(() => {
    fetch("/api/master-ingredients")
      .then((res) => res.json())
      .then((data) => setMasterIngredients(data))
      .catch(() => setMasterIngredients([]))
  }, [])

  const filteredIngredients = masterIngredients.filter(
    (ing) =>
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ingredients.some((i) => i.name === ing.name) &&
      typeof ing.category === 'string' &&
      !['chemia', 'household'].includes(ing.category.toLowerCase())
  )

  const handleAddIngredient = useCallback((ingredient: Ingredient) => {
    setIngredients((prev) => [
      ...prev,
      {
        ...ingredient,
        id: `ing-${Date.now()}`,
      },
    ])
    setSearchQuery("")
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }, [])

  const handleAddCustomIngredient = useCallback(() => {
    if (customIngredientName.trim()) {
      setIngredients((prev) => [
        ...prev,
        {
          id: `custom-${Date.now()}`,
          name: customIngredientName.trim(),
          category: customIngredientCategory as Ingredient["category"],
        },
      ])
      setCustomIngredientName("")
      setCustomIngredientAmount("")
      setShowCustomForm(false)
      searchInputRef.current?.focus()
    }
  }, [customIngredientName, customIngredientAmount, customIngredientCategory])

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => (ing.id || ing._id) !== id))
  }

  // removed handleUpdateAmount, not needed

  const handleSave = () => {
    if (!name.trim()) return

    const recipe: Recipe = {
      id: editRecipe?.id || `recipe-${Date.now()}`,
      name: name.trim(),
      description: "",
      category,
      tags: [],
      ingredients,
      steps: [],
      prepTime: 0,
      cookTime: 0,
    }
    onSave(recipe)
    onOpenChange(false)
    resetForm()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      handleSave()
      return
    }
    // Add ingredient on Enter if only one suggestion
    if (
      e.key === "Enter" &&
      showSuggestions &&
      filteredIngredients.length === 1 &&
      searchQuery.trim().length > 0
    ) {
      e.preventDefault()
      handleAddIngredient(filteredIngredients[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[98vw] w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl min-h-[650px] max-h-[99vh] md:min-h-[600px] md:max-h-[96vh] overflow-hidden flex flex-col bg-card border-border/50 shadow-2xl p-0 gap-0"
        style={{ borderRadius: 24 }}
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-lg font-semibold text-foreground">
            {isCopy
              ? t('Copy Recipe', { defaultValue: 'Kopiuj przepis' })
              : editRecipe
                ? t('Edit Recipe', { defaultValue: 'Edytuj przepis' })
                : t('New Recipe', { defaultValue: 'Nowy przepis' })}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Recipe Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              {t('Recipe Name')}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('Enter recipe name')}
              className="bg-secondary/50 border-border/50 focus:border-primary h-10"
              tabIndex={-1}
              readOnly
              onFocus={e => e.currentTarget.readOnly = false}
              onMouseDown={e => e.currentTarget.readOnly = false}
              onTouchStart={e => e.currentTarget.readOnly = false}
            />
          </div>

          {/* Recipe Category as Tabs */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              {t('Recipe Category')}
            </Label>
            <Tabs value={category} onValueChange={setCategory} className="w-full">
              <TabsList className="w-full flex flex-wrap gap-1">
                {showAllCategories
                  ? recipeCategories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="flex-1 min-w-[90px]">
                        {t(cat)}
                      </TabsTrigger>
                    ))
                  : <>
                      {recipeCategories.slice(0, 3).map(cat => (
                        <TabsTrigger key={cat} value={cat} className="flex-1 min-w-[90px]">
                          {t(cat)}
                        </TabsTrigger>
                      ))}
                      <TabsTrigger
                        value="more"
                        className="min-w-[40px] w-[40px] px-0 flex items-center justify-center"
                        style={{ flex: 'none' }}
                        onClick={e => { e.preventDefault(); setShowAllCategories(true); }}
                        aria-label={t('More categories')}
                      >
                        <MoreHorizontal className="mx-auto" />
                      </TabsTrigger>
                    </>
                }
              </TabsList>
            </Tabs>
          </div>

          {/* Ingredients */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              {t('Ingredients')}
              {ingredients.length > 0 && (
                <span className="inline-block min-w-5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold text-center">
                  {ingredients.length}
                </span>
              )}
            </Label>
            {/* Ingredient Search */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={e => { setShowSuggestions(true); e.currentTarget.readOnly = false; }}
                  onMouseDown={e => e.currentTarget.readOnly = false}
                  onTouchStart={e => e.currentTarget.readOnly = false}
                  placeholder={t('Search ingredients...')}
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-primary h-10"
                  tabIndex={-1}
                  readOnly
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border/50 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredIngredients.length > 0 ? (
                    filteredIngredients.slice(0, 8).map((ing) => (
                      <button
                        key={ing._id}
                        type="button"
                        onClick={() => handleAddIngredient(ing)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent/50 transition-colors"
                      >
                        <span
                          className={cn(
                            "text-[10px] font-medium uppercase px-1.5 py-0.5 rounded border",
                            categoryColors[ing.category]
                          )}
                        >
                          {t(ing.category ? String(ing.category) : '')}
                        </span>
                        <span className="text-sm text-foreground">{ing.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-sm text-muted-foreground">
                      {t('No ingredients found.')}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setCustomIngredientName(searchQuery)
                          setShowCustomForm(true)
                          setShowSuggestions(false)
                        }}
                        className="text-primary hover:underline"
                      >
                        {t('Add custom')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Custom Ingredient Form */}
            {showCustomForm && (
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 space-y-3 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                <div className="flex gap-2">
                  <Input
                    value={customIngredientName}
                    onChange={(e) => setCustomIngredientName(e.target.value)}
                    placeholder={t('Ingredient name')}
                    className="flex-1 bg-background/50 border-border/50 h-9"
                  />
                  <Input
                    value={customIngredientAmount}
                    onChange={(e) => setCustomIngredientAmount(e.target.value)}
                    placeholder={t('Amount')}
                    className="w-24 bg-background/50 border-border/50 h-9"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {ingredientCategories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCustomIngredientCategory(cat.value)}
                      className={cn(
                        "text-[10px] font-medium uppercase px-2 py-1 rounded border transition-all",
                        categoryColors[cat.value],
                        customIngredientCategory === cat.value
                          ? "ring-2 ring-primary/50"
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddCustomIngredient}
                    disabled={!customIngredientName.trim()}
                    className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {t('Add', { defaultValue: 'Dodaj' })}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCustomForm(false)
                      setCustomIngredientName("")
                      setCustomIngredientAmount("")
                    }}
                    className="h-8 text-xs text-muted-foreground"
                  >
                    {t('Cancel', { defaultValue: 'Anuluj' })}
                  </Button>
                </div>
              </div>
            )}

            {/* Added Ingredients List */}
            <div className="space-y-1.5 max-h-80 overflow-y-auto">
              {ingredients.map((ing) => (
                <div
                  key={ing.id || ing._id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border/30 group"
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase px-1.5 py-0.5 rounded border shrink-0",
                      categoryColors[ing.category]
                    )}
                  >
                    {t(ing.category)}
                  </span>
                  <span className="flex-1 text-sm text-foreground truncate">
                    {t(String(ing.name))}
                  </span>
                  {/* Removed input for ingredient amount */}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id || ing._id || "")}
                    className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center rounded"
                    aria-label="Usuń składnik"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {ingredients.length === 0 && (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  {t('Search and add ingredients above')}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border/50 flex items-center justify-end bg-secondary/10">
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
              disabled={!canSave}
              className="h-8 px-4 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Check className="h-3.5 w-3.5 mr-1.5" />
              {isCopy
                ? t('Copy', { defaultValue: 'Kopiuj' })
                : editRecipe
                  ? t('Edit', { defaultValue: 'Edytuj' })
                  : t('Create Recipe', { defaultValue: 'Utwórz przepis' })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
