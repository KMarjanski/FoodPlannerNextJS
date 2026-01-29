"use client";

import { useEffect } from "react";
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
  const setCart = cartStore((state) => state.setCart);
  const cartState = cartStore((state) => state.cart);
  const original = cartStore((state) => state.original);
  const initCart = cartStore((state) => state.initCart);
  const cartItems = (cartState && cartState[0] && cartState[0].cart) ? cartState[0].cart : [];
  // Inicjalizuj original w store na podstawie cart z serwera przy pierwszym renderze
  useEffect(() => {
    if (cart && cart.length > 0) {
      initCart(cart);
    }
  }, [cart, initCart]);

  const handleAddToCart = (ingredientId: string) => {
    if (cartItems.find((item) => item.name === ingredientId)) return;
    const ingredient = ingredients.find((item) => item.name === ingredientId);
    if (ingredient) {
      if (cartState && cartState[0] && cartState[0]._id) {
        setCart([{ _id: cartState[0]._id, cart: [...cartItems, ingredient] }]);
      }
    }
  };

  const handleRemoveFromCart = (ingredientId: string) => {
    const filtered = cartItems.filter((item) => item.name !== ingredientId);
    if (cartState && cartState[0] && cartState[0]._id) {
      setCart([{ _id: cartState[0]._id, cart: filtered }]);
    }
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
