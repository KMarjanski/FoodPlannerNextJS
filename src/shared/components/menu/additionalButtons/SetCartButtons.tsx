import { setCart } from "@features/cart/service";
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
  function normalize(arr) {
    return arr
      .filter(i => i && typeof i.name === "string" && typeof i.category === "string")
      .map(i => ({ name: i.name, category: i.category }))
      .sort((a, b) => a.name.localeCompare(b.name) || a.category.localeCompare(b.category));
  }
  function isCartEqual(a, b) {
    const normA = normalize(a);
    const normB = normalize(b);
    if (normA.length !== normB.length) return false;
    for (let i = 0; i < normA.length; i++) {
      if (normA[i].name !== normB[i].name || normA[i].category !== normB[i].category) return false;
    }
    return true;
  }
  console.log("cartArr", cartArr);
  console.log("originalArr", originalArr);
  console.log("normalize(cartArr)", normalize(cartArr));
  console.log("normalize(originalArr)", normalize(originalArr));
  console.log("isCartEqual", isCartEqual(cartArr, originalArr));
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
  return (
    <>
      <button className="btn mr-4" onClick={() => refresh(originalCart)}>
        <Text>Wygeneruj koszyk</Text>
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
