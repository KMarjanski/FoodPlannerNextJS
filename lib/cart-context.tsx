"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { Ingredient } from "./recipes-data"

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

  const addToCart = useCallback((ingredient: Ingredient) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === ingredient.id)
      if (existing) {
        return prev.map((item) =>
          item.id === ingredient.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...ingredient, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const isInCart = useCallback(
    (id: string) => cartItems.some((item) => item.id === id),
    [cartItems]
  )

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
