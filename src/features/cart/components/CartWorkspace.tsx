"use client";

import { useEffect, useState } from "react";
import { cartStore } from "@features/cart/store";
import CartList from "./CartList";
import { deleteIngredientByName } from "@core/entities/ingredients/service";
import IngredientsList from "./IngredientsList";
import { Ingredient, Ingredients } from "@core/entities/ingredients/types";
import { Cart } from "@features/cart/types";
import { ingredientsStore } from "@core/entities/ingredients/store";
import { useSearchParams } from "next/navigation";
import { getIngredients } from "@core/entities/ingredients/service";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};

const CartWorkspace = ({ cart, ingredients }: Props) => {
  const setCart = cartStore((state) => state.setCart);
  const cartState = cartStore((state) => state.cart);
  const initCart = cartStore((state) => state.initCart);
  const cartItems = (cartState && cartState[0] && cartState[0].cart) ? cartState[0].cart : [];
  const [editMode, setEditMode] = useState(false);
  const globalIngredients = ingredientsStore((state) => state.ingredients);
  const searchParams = useSearchParams();


  // Always hydrate cart and ingredients from server props on mount
  useEffect(() => {
    if (cart && cart.length > 0) {
      initCart(cart);
    }
    if (ingredients && ingredients.length > 0) {
      ingredientsStore.getState().setIngredients(ingredients);
    }
  }, [cart, initCart, ingredients]);

  // Always fetch fresh ingredients on search param change (navigation/search)
  const fetchFresh = async () => {
    const fresh = await getIngredients();
    ingredientsStore.getState().setIngredients(fresh);
  };
  useEffect(() => {
    fetchFresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("search")]);

  // Usuń efekt synchronizujący po searchParams!

  const handleAddToCart = async (ingredientId: string) => {
    if (cartItems.find((item: Ingredient) => item.name === ingredientId)) return;
    const ingredient = globalIngredients.find((item: Ingredient) => item.name === ingredientId);
    if (ingredient) {
      if (cartState && cartState[0] && cartState[0]._id) {
        setCart([{ _id: cartState[0]._id, cart: [...cartItems, ingredient] }]);
      }
    }
    // Always fetch fresh ingredients after add
    const fresh = await getIngredients();
    ingredientsStore.getState().setIngredients(fresh);
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
    // Usuwamy też z koszyka jeśli był
    handleRemoveFromCart(ingredientName);
    // Always fetch fresh ingredients after delete
    const fresh = await getIngredients();
    ingredientsStore.getState().setIngredients(fresh);
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
