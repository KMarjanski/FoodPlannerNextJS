
"use client";

import { useState, useMemo, useRef, useEffect } from "react"
import { useIsMobile } from "@/components/ui/use-mobile"
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

function polishItemLabel(count: number) {
  if (count === 1) return "przedmiot";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "przedmioty";
  return "przedmiotów";
}
interface CartContentProps {
  ingredients: Ingredient[]
}
function CartContent({ ingredients: initialIngredients }: CartContentProps) {
  // HOOKS: useIsMobile musi być zawsze na górze!
  const isMobile = useIsMobile();
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [lastSavedCart, setLastSavedCart] = useState<any>(null);
  // Pobierz ostatni koszyk z bazy przy starcie
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (data.success && data.cart && Array.isArray(data.cart.items)) {
          setLastSavedCart(data.cart.items);
        }
      } catch {}
    })();
  }, []);

  // Porównanie koszyków (bez kolejności)
  function areCartsEqual(a: any[], b: any[]): boolean {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    const sortFn = (x: any) => (x._id || x.name) + ":" + x.quantity;
    const arrA = [...a].map(sortFn).sort();
    const arrB = [...b].map(sortFn).sort();
    return arrA.every((v, i) => v === arrB[i]);
  }
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  // showSaveMsg: false | true | 'fading'
  const [showSaveMsg, setShowSaveMsg] = useState<false | true | 'fading'>(false);
  async function handleSaveCart() {
    setSaving(true);
    setSaveMsg(null);
    setShowSaveMsg(false);
    try {
      // Pobierz aktualny stan z API, aby zachować checked jeśli istnieje
      let checkedMap: Record<string, boolean> = {};
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (data.success && data.cart && Array.isArray(data.cart.items)) {
          for (const item of data.cart.items) {
            const key = item._id || item.id || item.name;
            if (typeof item.checked === "boolean") checkedMap[key] = item.checked;
          }
        }
      } catch {}

      // Przygotuj dane do zapisu, zachowując checked jeśli istnieje
      const itemsToSave = cartItems.map(item => {
        const key = item._id || item.id || item.name;
        return {
          ...item,
          checked: typeof checkedMap[key] === "boolean" ? checkedMap[key] : false,
        };
      });

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToSave }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg(t("Cart saved!"));
        setShowSaveMsg(true);
      } else {
        setSaveMsg("Błąd zapisu: " + (data.error || ""));
        setShowSaveMsg(true);
      }
    } catch (e: any) {
      setSaveMsg("Błąd zapisu: " + (e.message || ""));
    } finally {
      setSaving(false);
    }
  }
  // Fade out komunikatu: najpierw 1s pełna widoczność, potem 1.2s ease-in do 0, potem usunięcie
  useEffect(() => {
    if (showSaveMsg === true) {
      const fadeTimeout = setTimeout(() => setShowSaveMsg('fading'), 1000);
      return () => clearTimeout(fadeTimeout);
    }
    if (showSaveMsg === 'fading') {
      const removeTimeout = setTimeout(() => {
        setShowSaveMsg(false);
        setSaveMsg(null);
      }, 1200);
      return () => clearTimeout(removeTimeout);
    }
  }, [showSaveMsg]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isInCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Synchronizuj ingredients po każdej zmianie koszyka, by wymusić rerender i poprawne zaznaczenie
  useEffect(() => {
    setIngredients((prev) => [...prev]);
  }, [cartItems]);
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
              {/* Save cart button removed, auto-save is now enabled */}
              <Button
                variant="default"
                size="sm"
                className="mr-2"
                onClick={async () => {
                  try {
                    // Fetch all weeks and meals from planner
                    const res = await fetch("/api/meal-data");
                    const weeks = await res.json();
                    // Gather all recipe IDs from all meals
                    const recipeIds = new Set<string>();
                    weeks.forEach((week: any) => {
                      week.days.forEach((day: any) => {
                        ["breakfast", "lunch", "dinner"].forEach((mealType) => {
                          day[mealType]?.forEach((recipe: any) => {
                            if (recipe && recipe.id) {
                              recipeIds.add(recipe.id);
                            }
                          });
                        });
                      });
                    });
                    // Fetch all recipes from DB
                    const recipesRes = await fetch("/api/recipes");
                    const allRecipes = await recipesRes.json();
                    // Collect all unique ingredients from recipes used in planner
                    const allIngredients: Record<string, Ingredient> = {};
                    allRecipes.forEach((recipe: any) => {
                      if (recipeIds.has(recipe.id) && Array.isArray(recipe.ingredients)) {
                        recipe.ingredients.forEach((ingredient: any) => {
                          if (ingredient && (ingredient.id || ingredient._id)) {
                            allIngredients[ingredient.id || ingredient._id] = ingredient;
                          }
                        });
                      }
                    });
                    // Log how many unique ingredients were found
                    const foundIngredients = Object.values(allIngredients);
                    if (foundIngredients.length > 0) {
                      clearCart();
                      foundIngredients.forEach((ing) => addToCart(ing));
                      setSaveMsg(`${t("Generate cart")}: ${foundIngredients.length} ${t("ingredients")}`);
                      setShowSaveMsg(true);
                    } else {
                      setSaveMsg(`${t("Generate cart")}: 0 ${t("ingredients")}. Koszyk jest pusty, bo nie znaleziono żadnych składników w daniach.`);
                      setShowSaveMsg(true);
                    }
                  } catch (err) {
                    setSaveMsg("Error generating cart");
                    setShowSaveMsg(true);
                  }
                }}
              >
                {t("Generate cart")}
              </Button>
              {(showSaveMsg === true || showSaveMsg === 'fading') && (
                <span
                  className={`text-xs ml-2 text-muted-foreground transition-opacity ${showSaveMsg === true ? 'opacity-100 duration-0' : showSaveMsg === 'fading' ? 'opacity-0 duration-[1200ms] ease-in' : 'opacity-0 duration-200'}`}
                >
                  {saveMsg}
                </span>
              )}
              <Badge
                variant="secondary"
                className="text-sm py-1.5 px-3 bg-secondary/80"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                {totalItems} {polishItemLabel(totalItems)}
              </Badge>
              {/* Go to List button removed as requested */}
            </div>
          </div>
        </div>
      </header>
      <main className="px-6 py-6">
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
                {/* Kategorie: select na mobile, buttony na desktop */}
                {isMobile ? (
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-border/50 bg-secondary/50 text-sm mb-2"
                  >
                    <option value="all">{t("All")}</option>
                    {ingredientCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{t(cat.label)}</option>
                    ))}
                  </select>
                ) : (
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
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 max-h-[77vh] overflow-y-auto pr-2">
                {filteredIngredients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {t("No ingredients found")}
                  </div>
                ) : (
                  [...filteredIngredients]
                    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
                    .map((ing) => {
                      const key = ing._id || ing.name;
                      return (
                        <IngredientItem
                          key={key}
                          ingredient={ing}
                          isInCart={isInCart(key)}
                          onAdd={() => addToCart(ing)}
                          onRemove={(id) => {
                            if (id) setIngredients(prev => prev.filter(i => i._id !== id));
                            else removeFromCart(key);
                          }}
                          isMobile={isMobile}
                        />
                      );
                    })
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
                </CardTitle>
                {cartItems.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowClearConfirm(true)}
                      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      {t("Clear All")}
                    </Button>
                    {showClearConfirm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-card p-6 rounded-lg shadow-lg border border-border w-full max-w-xs flex flex-col items-center">
                          <div className="mb-4 text-center">
                            <p className="text-base font-semibold text-destructive mb-2">{t("Are you sure?")}</p>
                            <p className="text-sm text-muted-foreground">{t("This will remove all items from your cart.")}</p>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="destructive" size="sm" onClick={() => { clearCart(); setShowClearConfirm(false); }}>
                              {t("Yes, clear all")}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowClearConfirm(false)}>
                              {t("Cancel")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
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
                <div className="space-y-4 max-h-[83vh] overflow-y-auto pr-2">
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
                          {items.map((item) => {
                            const key = item._id || item.name;
                            return (
                              <IngredientItem
                                key={key}
                                ingredient={item}
                                onRemove={() => removeFromCart(key)}
                                isInCart={true}
                                isMobile={isMobile}
                              />
                            );
                          })}
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
      </main>
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
