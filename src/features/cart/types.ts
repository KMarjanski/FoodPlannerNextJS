import { Ingredient } from "@core/entities/ingredients/types";

export type CartEntry = {
  _id: string;
  cart: Ingredient[];
};

export type Cart = CartEntry[];
