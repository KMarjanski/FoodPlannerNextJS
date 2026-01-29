import { setCart } from "@features/cart/service";
import { generateCartFromPlanner } from "@features/planner/service.server";
import { cartStore } from "@features/cart/store";
import React from "react";
import Text from "../../topography/Text";

import { useState } from "react";

const SetCartButtons = () => {
  const [loading, setLoading] = useState(false);
  const originalCart = cartStore((state) => state.original);
  const cart = cartStore((state) => state.cart);
  // Porównuj po posortowanych nazwach składników
  const cartArr = (cart && cart[0] && cart[0].cart) ? cart[0].cart : [];
  const originalArr = (originalCart && originalCart[0] && originalCart[0].cart) ? originalCart[0].cart : [];
  type SimpleIngredient = { name: string; category: string };
  function normalize(arr: any[]): SimpleIngredient[] {
    return arr
      .filter((i: any) => i && typeof i.name === "string" && typeof i.category === "string")
      .map((i: any) => ({ name: i.name, category: i.category }))
      .sort((a: SimpleIngredient, b: SimpleIngredient) => a.name.localeCompare(b.name) || a.category.localeCompare(b.category));
  }
  function isCartEqual(a: any[], b: any[]): boolean {
    const normA = normalize(a);
    const normB = normalize(b);
    if (normA.length !== normB.length) return false;
    for (let i = 0; i < normA.length; i++) {
      if (normA[i].name !== normB[i].name || normA[i].category !== normB[i].category) return false;
    }
    return true;
  }
  const displaySaveCart = !isCartEqual(cartArr, originalArr);
  const resetCart = cartStore((state) => state.resetCart);
  const refresh = cartStore((state) => state.setCart);
  const handleSave = async () => {
    setLoading(true);
    try {
      // Przekazuj pojedynczy CartEntry
      const entry = cart && cart[0] ? cart[0] : { cart: [] };
      const clearEntry = JSON.parse(JSON.stringify(entry));
      await setCart(clearEntry);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  const clearCart = () => {
    if (cart && cart[0] && cart[0]._id) {
      refresh([{ _id: cart[0]._id, cart: [] }]);
    }
  };
  // Nowa funkcja: generuj koszyk na podstawie planera
  const handleGenerateCart = async () => {
    setLoading(true);
    try {
      // Pobierz wygenerowany koszyk z serwera
      const ingredients = await generateCartFromPlanner();
      // Ustaw w store (jako CartEntry[])
      if (cart && cart[0] && cart[0]._id) {
        refresh([{ _id: cart[0]._id, cart: ingredients }]);
      } else {
        refresh([{ _id: "", cart: ingredients }]);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button className="btn mr-4" onClick={handleGenerateCart} disabled={loading}>
        <Text>{loading ? "Generowanie..." : "Wygeneruj koszyk"}</Text>
      </button>
      <button
        className={
          `btn mr-4 btn-outline` +
          ((
            !cart ||
            cart.length === 0 ||
            !cart[0] ||
            !Array.isArray(cart[0].cart) ||
            cart[0].cart.length === 0
          ) ? ' opacity-50 cursor-not-allowed' : '')
        }
        style={{ background: 'white', color: '#333', borderColor: '#ccc' }}
        onClick={clearCart}
        disabled={
          !cart ||
          cart.length === 0 ||
          !cart[0] ||
          !Array.isArray(cart[0].cart) ||
          cart[0].cart.length === 0
        }
        title={
          !cart || cart.length === 0 || !cart[0] || !Array.isArray(cart[0].cart) || cart[0].cart.length === 0
            ? 'Koszyk jest już pusty'
            : ''
        }
      >
        <Text>Wyczyść koszyk</Text>
      </button>
      <button
        className="btn mr-4 btn-success"
        onClick={handleSave}
        disabled={!displaySaveCart || loading}
        title={!displaySaveCart ? 'Koszyk jest już zapisany' : ''}
      >
        {loading ? <Text>Zapisywanie...</Text> : <Text>Zapisz koszyk</Text>}
      </button>
    </>
  );
};

export default SetCartButtons;
