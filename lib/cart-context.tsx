"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Ingredient } from "./types"

export interface CartItem extends Ingredient {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (ingredient: Ingredient) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Pobierz koszyk z API przy starcie
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (data.success && data.cart && Array.isArray(data.cart.items)) {
          setCartItems(data.cart.items);
        }
      } catch (e) {
        // błąd pobierania koszyka ignorujemy
      }
    })();
  }, []);

  const getIngredientKey = (ingredient: Ingredient & { _id?: string }) => ingredient._id || ingredient.name;

  // Helper to save cart to API
  const saveCartToAPI = async (items: CartItem[]) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch {}
  };

  const addToCart = useCallback((ingredient: Ingredient & { _id?: string }) => {
    setCartItems((prev) => {
      const key = ingredient._id || ingredient.name;
      const existing = prev.find((item) => (item._id || item.name) === key);
      if (existing) {
        return prev;
      }
      const updated = [...prev, { ...ingredient, _id: ingredient._id || ingredient.name, quantity: 1 }];
      saveCartToAPI(updated);
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      saveCartToAPI(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems((prev) => {
      let updated;
      if (quantity <= 0) {
        updated = prev.filter((item) => item._id !== id);
      } else {
        updated = prev.map((item) => (item._id === id ? { ...item, quantity } : item));
      }
      saveCartToAPI(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems((prev) => {
      saveCartToAPI([]);
      return [];
    });
  }, []);

  const isInCart = useCallback(
    (id: string) => cartItems.some((item) => (item._id || item.name) === id),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
