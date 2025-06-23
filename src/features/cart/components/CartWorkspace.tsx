"use client";

import { useState, useMemo } from "react";
import CartList from "./CartList";
import IngredientsList from "./IngredientsList";
import { Ingredients, Ingredient } from "@core/entities/ingredients/model";
import { Cart } from "../model";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};

const CartWorkspace = ({ cart, ingredients }: Props) => {
  const [cartItems, setCartItems] = useState<Ingredient[]>(cart.cart ?? []);

  const handleAddToCart = (ingredientId: string) => {
    if (cartItems.find((item) => item.name === ingredientId)) return;
    const ingredient = ingredients.find((item) => item.name === ingredientId);
    if (ingredient) setCartItems([...cartItems, ingredient]);
  };

  const handleRemoveFromCart = (ingredientId: string) => {
    setCartItems(cartItems.filter((item) => item.name !== ingredientId));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
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
