"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Filter, Grid3X3, List } from "lucide-react"
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
import { type Recipe, sampleRecipes, recipeCategories } from "@/lib/recipes-data"

export function RecipesView() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [copyingRecipe, setCopyingRecipe] = useState<Recipe | null>(null)

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesCategory =
        categoryFilter === "all" || recipe.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, categoryFilter])

  const handleSaveRecipe = (recipe: Recipe) => {
    if (copyingRecipe) {
      setRecipes((prev) => [...prev, recipe])
      setCopyingRecipe(null)
      setEditingRecipe(null)
      return
    }
    if (editingRecipe) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === recipe.id ? recipe : r))
      )
    } else {
      setRecipes((prev) => [...prev, recipe])
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
      name: recipe.name + " (Copy)",
    }
    setCopyingRecipe(copied)
    setIsAddModalOpen(true)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Recipes</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {filteredRecipes.length} recipes available
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingRecipe(null)
                  setIsAddModalOpen(true)
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Recipe
              </Button>
            </div>

            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="pl-9 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] bg-secondary/50 border-border/50">
                    <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {recipeCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center rounded-lg border border-border/50 bg-secondary/50 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`h-7 w-7 ${
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`h-7 w-7 ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>
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
                No recipes found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
                className="border-border/50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={() => {}}
                  onEdit={() => handleEditRecipe(recipe)}
                  onAddToPlanner={() => copyRecipe(recipe)}
                  onDelete={() => setRecipes((prev) => prev.filter((r) => r.id !== recipe.id))}
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
        editRecipe={copyingRecipe || editingRecipe}
      />
    </AppLayout>
  )
}
