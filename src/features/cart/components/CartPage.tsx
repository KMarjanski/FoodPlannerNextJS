"use client";

import CartWorkspace from "./CartWorkspace";
import { Cart } from "@features/cart/types";
import { Ingredients } from "@core/entities/ingredients/types";
import SectionBox from "@shared/components/SectionBox";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};

import Heading from "@shared/components/topography/Heading";

const CartPage = ({ cart, ingredients }: Props) => {
  return (
    <SectionBox as="section" className="max-w-7xl mx-auto mt-8 rounded-xl shadow-lg p-6 backdrop-blur-sm bg-gray-300">
      <Heading level={2} className="mb-6 text-emerald-700 text-center">
        Koszyk
      </Heading>
      <CartWorkspace cart={cart} ingredients={ingredients} />
    </SectionBox>
  );
};

export default CartPage;
