"use client"

import { useState, useMemo, useEffect } from "react"

import { Plus, Search, Filter, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppLayout } from "@/components/meal-planner/app-layout"
import { RecipeCard } from "./recipe-card"
import { AddRecipeModal } from "./add-recipe-modal"
import type { Recipe } from "@/lib/recipes-data"
import { recipeCategories } from "@/lib/recipes-data"
import { useTranslation } from "react-i18next"

export function RecipesView() {
  const { t } = useTranslation();

  const [recipes, setRecipes] = useState<Recipe[]>([])
  // Pobierz przepisy przez API
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch(() => setRecipes([]))
  }, [])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  // usunięto przełącznik widoku grid/list
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [copyingRecipe, setCopyingRecipe] = useState<Recipe | null>(null)

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesCategory =
        categoryFilter === "all" || recipe.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, categoryFilter])

  const handleSaveRecipe = async (recipe: Recipe) => {
    if (copyingRecipe) {
      try {
        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        })
        const saved = await res.json()
        setRecipes((prev) => [...prev, saved])
      } catch (e) {}
      setCopyingRecipe(null)
      setEditingRecipe(null)
      return
    }
    if (editingRecipe) {
      // Update recipe in DB
      try {
        const res = await fetch("/api/recipes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        })
        const updated = await res.json()
        setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
      } catch (e) {}
    } else {
      // Save new recipe to DB
      try {
        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipe),
        })
        const saved = await res.json()
        setRecipes((prev) => [...prev, saved])
      } catch (e) {}
    }
    setEditingRecipe(null)
  }

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setIsAddModalOpen(true)
  }

  // Copy recipe logic
  const copyRecipe = (recipe: Recipe) => {
    // Generate new ID (simple unique string)
    const newId = `${recipe.id}-copy-${Date.now()}`
    const copied: Recipe = {
      ...recipe,
      id: newId,
      name: "",
    }
    setCopyingRecipe(copied)
    setIsAddModalOpen(true)
  }

  // Helper to check if there are no filters/search
  const noFilters = searchQuery.trim() === "" && categoryFilter === "all"

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  {typeof window !== 'undefined' && window.innerWidth < 768 ? null : <ChefHat className="h-5 w-5 text-primary" />}
                  <span className={typeof window !== 'undefined' && window.innerWidth < 768 ? 'ml-13' : ''}>{t('Recipes')}</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className={typeof window !== 'undefined' && window.innerWidth < 768 ? 'ml-13' : ''}>{filteredRecipes.length} {t('recipes available')}</span>
                </p>
              </div>
              <div className="relative w-full sm:w-auto">
                <Button
                  onClick={() => {
                    setEditingRecipe(null)
                    setIsAddModalOpen(true)
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto"
                  id="add-recipe-btn"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('Add New Recipe')}
                </Button>
                {/* Arrow for empty state */}
                {filteredRecipes.length === 0 && noFilters && (
                  <div className="absolute -top-10 right-0 flex flex-col items-center animate-bounce z-20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 7l-5 5-5-5"/></svg>
                    <span className="text-xs text-primary mt-1">{t('Add your first recipe!')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center w-full">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('Search recipes...')}
                  className="pl-9 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger
                    className={
                      `bg-secondary/50 border-border/50 px-3` +
                      ((typeof window !== 'undefined' && window.innerWidth < 768) ? ' w-full' : ' min-w-fit')
                    }
                  >
                    <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue placeholder={t('Category')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('All Categories')}</SelectItem>
                    {recipeCategories.map((cat: string) => (
                      <SelectItem key={cat} value={cat}>
                        {t(cat)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* usunięto przełącznik widoku grid/list */}
              </div>
            </div>
          </div>
        </header>
        <main className="px-6 py-6">
          {filteredRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {t('No recipes')}
              </h3>
              {noFilters ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('You have no recipes yet. Click the button above to add your first recipe!')}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('Try adjusting your search or filter criteria')}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                    }}
                    className="border-border/50"
                  >
                    {t('Clear Filters')}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={() => {}}
                  onEdit={() => handleEditRecipe(recipe)}
                  onAddToPlanner={() => copyRecipe(recipe)}
                  onDelete={async () => {
                    try {
                      await fetch("/api/recipes", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: recipe.id }),
                      })
                      setRecipes((prev) => prev.filter((r) => r.id !== recipe.id))
                    } catch (e) {}
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <AddRecipeModal
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open)
          if (!open) setCopyingRecipe(null)
        }}
        onSave={handleSaveRecipe}
        editRecipe={copyingRecipe ? null : editingRecipe}
        originalRecipe={copyingRecipe ? recipes.find(r => r.id === copyingRecipe.id.split('-copy-')[0]) : null}
      />
    </AppLayout>
  )
}
