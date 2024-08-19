import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cart: { type: Array, required: true, unique: true },
  date: { type: Date, required: true },
});

export default mongoose.models.cart ||
  mongoose.model("cart", cartSchema, "cart");
