"use client";

import CartWorkspace from "./CartWorkspace";
import { Cart } from "@features/cart/types";
import { Ingredients } from "@core/entities/ingredients/types";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
  debug?: any;
};

import Heading from "@shared/components/topography/Heading";

const CartPage = ({ cart, ingredients, debug }: Props & { debug?: any }) => {
  return (
    <>
      {debug && (
        <pre style={{ maxWidth: 600, fontSize: 12, background: "#eee", color: "#333", padding: 8, margin: 8, overflow: "auto" }}>
          {JSON.stringify(debug, null, 2)}
        </pre>
      )}
      <section className="max-w-7xl mx-auto mt-8 bg-white/90 rounded-xl shadow-lg p-6 backdrop-blur-sm">
        <Heading level={2} className="mb-6 text-emerald-700 text-center">
          Koszyk
        </Heading>
        <CartWorkspace cart={cart} ingredients={ingredients} />
      </section>
    </>
  );
};

export default CartPage;
