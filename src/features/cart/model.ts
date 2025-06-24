import mongoose from "mongoose";
import { Ingredient } from "@/src/core/entities/ingredients/model";

const cartSchema = new mongoose.Schema({
  cart: { type: [mongoose.Schema.Types.Mixed], required: true, unique: true },
});

export type CartEntry = {
  _id: string;
  cart: Ingredient[];
};

export type Cart = CartEntry[];

export default mongoose.models.cart ||
  mongoose.model("cart", cartSchema, "cart");
