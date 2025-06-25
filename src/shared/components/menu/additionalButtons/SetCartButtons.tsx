import { setCart } from "@features/cart/service";
import { cartStore } from "@features/cart/store";
import React from "react";
import Text from "../../topography/Text";

const SetCartButtons = () => {
  const originalCart = cartStore((state) => state.original);
  const cart = cartStore((state) => state.cart);
  const displaySaveCart = JSON.stringify(cart) !== JSON.stringify(originalCart);
  const resetCart = cartStore((state) => state.resetCart);
  const refresh = cartStore((state) => state.setCart);
  const handleSave = () => {
    const clearCart = JSON.parse(JSON.stringify(cart));
    setCart(clearCart);
    window.location.reload();
  };
  return (
    <>
      <button className="btn mr-4" onClick={() => refresh(originalCart)}>
        <Text>Generate cart</Text>
      </button>
      {displaySaveCart && (
        <button className="btn mr-4" onClick={() => refresh(originalCart)}>
          <Text>Refresh</Text>
        </button>
      )}
      {displaySaveCart && (
        <button className="btn mr-4 btn-success" onClick={() => handleSave()}>
          <Text>Save cart</Text>
        </button>
      )}
    </>
  );
};

export default SetCartButtons;
