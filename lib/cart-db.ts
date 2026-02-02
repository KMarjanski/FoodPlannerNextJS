import dbConnect from "./mongodb";
import { Collection, ObjectId } from "mongodb";

export async function getCartCollection(): Promise<Collection> {
  const db = (await dbConnect()).connection.db;
  return db.collection("carts");
}
