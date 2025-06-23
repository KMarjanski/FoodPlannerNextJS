import { Ingredients as IngredientsModel } from "@core/entities/ingredients/model";
import { getIngredients } from "@core/entities/ingredients/service";
import { Cart as CartModel } from "@/src/features/cart/model";
import { getCart } from "@/src/features/cart/service";

const Cart = async () => {
  const cart = await getCart();
  const ingredients = await getIngredients();
  const newCart = JSON.parse(JSON.stringify(cart)) as CartModel;
  const newIngredients = JSON.parse(
    JSON.stringify(ingredients)
  ) as IngredientsModel;
  return <div>cart</div>;
};

export default Cart;
