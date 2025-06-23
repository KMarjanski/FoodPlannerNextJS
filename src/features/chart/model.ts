import mongoose from "mongoose";
import { Ingredient } from "@/src/core/entities/ingredients/model";

const cartSchema = new mongoose.Schema({
  cart: { type: Array, required: true, unique: true },
  date: { type: Date, required: true },
});

export type Cart = Ingredient[];

export default mongoose.models.cart ||
  mongoose.model("cart", cartSchema, "cart");
