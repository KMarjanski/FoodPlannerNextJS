import CartWorkspace from "./CartWorkspace";
import { Cart } from "../model";
import { Ingredients } from "@core/entities/ingredients/model";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};


import Heading from "@shared/components/topography/Heading";

const CartPage = ({ cart, ingredients }: Props) => {
  return (
    <section className="max-w-7xl mx-auto mt-8 bg-white/90 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <Heading level={2} className="mb-6 text-emerald-700 text-center">
        Koszyk
      </Heading>
      <CartWorkspace cart={cart} ingredients={ingredients} />
    </section>
  );
};

export default CartPage;
