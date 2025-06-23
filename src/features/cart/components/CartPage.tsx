import CartWorkspace from "./CartWorkspace";
import { Cart } from "../model";
import { Ingredients } from "@core/entities/ingredients/model";

type Props = {
  cart: Cart;
  ingredients: Ingredients;
};

const CartPage = ({ cart, ingredients }: Props) => {
  return (
    <div className="p-4">
      <CartWorkspace cart={cart} ingredients={ingredients} />
    </div>
  );
};

export default CartPage;
