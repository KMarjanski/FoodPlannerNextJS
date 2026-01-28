"use client";

import { useState, useEffect } from "react";
import { cartStore } from "@features/cart/store";
import CartList from "./CartList";
import IngredientsList from "./IngredientsList";
import { Ingredients, Ingredient } from "@core/entities/ingredients/model";
import { Cart } from "../model";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};

const CartWorkspace = ({ cart, ingredients }: Props) => {
  const [cartItems, setCartItems] = useState<Ingredient[]>(cart[0].cart ?? []);
  const setCart = cartStore((state) => state.setCart);
  const original = cartStore((state) => state.original);
  const initCart = cartStore((state) => state.initCart);

  // Inicjalizuj original w store na podstawie cart z serwera przy pierwszym renderze
  useEffect(() => {
    if (cart && cart.length > 0) {
      initCart(cart);
    }
  }, [cart, initCart]);
  // Synchronizuj cartItems z globalnym stanem cartStore
  useEffect(() => {
    if (cart && cart[0] && cart[0]._id) {
      setCart([{ _id: cart[0]._id, cart: cartItems }]);
    } else {
      setCart([{ cart: cartItems }]);
    }
  }, [cartItems]);
  // Synchronizuj do store pojedynczy CartEntry (nie tablicę)
  useEffect(() => {
    if (cart && cart[0] && cart[0]._id) {
      setCart([{ _id: cart[0]._id, cart: cartItems }]);
    } else {
      setCart([{ cart: cartItems }]);
    }
  }, [cartItems]);
  // Jeśli zmieni się oryginalny koszyk (np. po wygenerowaniu), zresetuj lokalny stan
  useEffect(() => {
    setCartItems(cart[0].cart ?? []);
  }, [original, cart]);

  const handleAddToCart = (ingredientId: string) => {
    if (cartItems.find((item) => item.name === ingredientId)) return;
    const ingredient = ingredients.find((item) => item.name === ingredientId);
    if (ingredient) setCartItems([...cartItems, ingredient]);
  };

  const handleRemoveFromCart = (ingredientId: string) => {
    setCartItems(cartItems.filter((item) => item.name !== ingredientId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <CartList cartItems={cartItems} onRemove={handleRemoveFromCart} />
      <IngredientsList
        ingredients={ingredients}
        cartItems={cartItems}
        onAdd={handleAddToCart}
      />
    </div>
  );
};

export default CartWorkspace;
