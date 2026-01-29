"use client";

import { useEffect, useState } from "react";
import { cartStore } from "@features/cart/store";
import CartList from "./CartList";
import { deleteIngredientByName } from "@core/entities/ingredients/service";
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
  const [editMode, setEditMode] = useState(false);
  const [allIngredients, setAllIngredients] = useState(ingredients);

  useEffect(() => {
    if (cart && cart.length > 0) {
      initCart(cart);
    }
  }, [cart, initCart]);

  const handleAddToCart = (ingredientId: string) => {
    if (cartItems.find((item) => item.name === ingredientId)) return;
    const ingredient = allIngredients.find((item) => item.name === ingredientId);
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

  // Usuwanie składnika z bazy i odświeżenie listy
  const handleDeleteIngredient = async (ingredientName: string) => {
    await deleteIngredientByName(ingredientName);
    setAllIngredients((prev) => prev.filter((i) => i.name !== ingredientName));
    // Usuwamy też z koszyka jeśli był
    handleRemoveFromCart(ingredientName);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <div>
        <CartList
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
        />
      </div>
      <IngredientsList
        ingredients={allIngredients}
        cartItems={cartItems}
        onAdd={handleAddToCart}
        editMode={editMode}
        setEditMode={setEditMode}
        onDeleteIngredient={handleDeleteIngredient}
      />
    </div>
  );
};

export default CartWorkspace;
