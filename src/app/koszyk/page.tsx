import type { Cart } from "@features/cart/types";
import { getCart } from "@/src/features/cart/service";
import { getIngredients } from "@/src/core/entities/ingredients/service";
import CartPage from "@features/cart/components/CartPage";

export const dynamic = 'force-dynamic';

const Cart = async () => {
  const cart = await getCart();
  const ingredients = await getIngredients();
  const newCart = JSON.parse(JSON.stringify(cart)) as Cart;
  const newIngredients = JSON.parse(JSON.stringify(ingredients)) as Ingredients;

  // Podwójna serializacja
  const safeCart = JSON.parse(JSON.stringify(newCart));
  const safeIngredients = JSON.parse(JSON.stringify(newIngredients));

  return <CartPage cart={safeCart} ingredients={safeIngredients} />;
};

export default Cart;
