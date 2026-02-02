"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/meal-planner/app-layout"
import { IngredientItem } from "./ingredient-item"
import { useCart, CartProvider } from "@/lib/cart-context"
import {
  ingredientCategories,
} from "@/lib/recipes-data"

// Define IngredientCategory type based on ingredientCategories values
type IngredientCategory = (typeof ingredientCategories)[number]["value"];

import type { Ingredient } from "@/lib/types"
import { t } from "i18next"
interface CartContentProps {
  ingredients: Ingredient[]
}
function CartContent({ ingredients }: CartContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isInCart } = useCart();
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ing) => {
      const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || ing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchQuery, selectedCategory]);
  // Refs do inputów
  const searchInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);
  const groupedCartItems = useMemo(() => {
    const groups: Record<IngredientCategory, typeof cartItems> = ingredientCategories.reduce((acc, cat) => {
      acc[cat.value as IngredientCategory] = [];
      return acc;
    }, {} as Record<IngredientCategory, typeof cartItems>);
    cartItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [cartItems]);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // Dynamiczny formularz: wyszukiwarka lub dodawanie składnika
    // Focus automatyczny przy zmianie trybu inputu
    useEffect(() => {
      if (filteredIngredients.length > 0) {
        searchInputRef.current?.focus();
      } else {
        addInputRef.current?.focus();
      }
    }, [filteredIngredients.length]);
  const [newCategory, setNewCategory] = useState<IngredientCategory>(ingredientCategories[0]?.value || "fruits");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  async function handleAddIngredient(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/master-ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: searchQuery, category: newCategory }),
      });
      if (!res.ok) throw new Error("Failed to add ingredient");
      setSearchQuery("");
      setNewCategory(ingredientCategories[0]?.value || "fruits");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setAdding(false);
    }
  }
  return (
    <>
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {t("Cart Builder")}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t("Build your shopping cart from available ingredients")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="text-sm py-1.5 px-3 bg-secondary/80"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                {totalItems} {t("items")}
              </Badge>
              {cartItems.length > 0 && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = "/lista")}
                >
                  {t("Go to List")}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Ingredients Column */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                {t("All Ingredients")}
              </CardTitle>
              {/* Dynamiczny input: wyszukiwarka lub formularz dodawania */}
              <div className="space-y-3 mt-3">
                {filteredIngredients.length > 0 ? (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("Search ingredients...")}
                      className="pl-9 bg-secondary/50 border-border/50"
                    />
                  </div>
                ) : (
                  <form onSubmit={handleAddIngredient} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Input
                        ref={addInputRef}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t("Ingredient name")}
                        required
                        className="bg-secondary/50 border-border/50"
                      />
                      <select
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value as IngredientCategory)}
                        className="px-2 py-1 rounded border border-border/50 bg-secondary/50 text-sm"
                      >
                        {ingredientCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{t(cat.label)}</option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" disabled={adding || !searchQuery}>
                        {adding ? t("Adding...") : t("Add")}
                      </Button>
                    </div>
                    {error && <div className="text-xs text-destructive">{error}</div>}
                  </form>
                )}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all ${
                      selectedCategory === "all"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary/50 text-muted-foreground border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {t("All")}
                  </button>
                  {ingredientCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all ${
                        selectedCategory === cat.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/50 text-muted-foreground border-border/50 hover:border-primary/50"
                      }`}
                    >
                      {t(cat.label)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredIngredients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {t("No ingredients found")}
                  </div>
                ) : (
                  filteredIngredients.map((ing) => (
                    <IngredientItem
                      key={ing._id ?? ing.name}
                      ingredient={ing}
                      isInCart={isInCart(ing._id ?? ing.name)}
                      onAdd={() => addToCart(ing)}
                      onRemove={() => removeFromCart(ing._id ?? ing.name)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shopping Cart Column */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  {t("Shopping Cart")}
                  {cartItems.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs bg-primary/15 text-primary"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </CardTitle>
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    {t("Clear All")}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    {t("Your cart is empty")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("Add ingredients from the left panel")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {Object.entries(groupedCartItems).map(([category, items]) => {
                    if (items.length === 0) return null
                    const categoryLabel = ingredientCategories.find(
                      (c) => c.value === category
                    )?.label
                    return (
                      <div key={category}>
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                          {t(categoryLabel ?? "")}
                        </h4>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <IngredientItem
                              key={item._id ?? item.name}
                              ingredient={item}
                              quantity={item.quantity}
                              showQuantityControls
                              onQuantityChange={(qty) =>
                                updateQuantity(item._id ?? item.name, qty)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>

  )
}

export { CartContent }

interface CartViewProps {
  ingredients: Ingredient[]
}
export function CartView({ ingredients }: CartViewProps) {
  return (
    <CartProvider>
      <CartContent ingredients={ingredients} />
    </CartProvider>
  )
}
