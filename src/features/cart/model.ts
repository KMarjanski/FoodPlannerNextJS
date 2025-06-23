import mongoose from "mongoose";
import { Ingredient } from "@/src/core/entities/ingredients/model";

const cartSchema = new mongoose.Schema({
  cart: { type: [mongoose.Schema.Types.Mixed], required: true, unique: true },
});

export type Cart = {
  cart: Ingredient[];
};

export default mongoose.models.cart ||
  mongoose.model("cart", cartSchema, "cart");
