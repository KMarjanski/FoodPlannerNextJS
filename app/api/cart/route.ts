import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const collection = await getCartCollection();
    const lastCart = await collection.find().sort({ createdAt: -1 }).limit(1).toArray();
    if (lastCart.length === 0) {
      return NextResponse.json({ success: false, error: "No cart found" });
    }
    return NextResponse.json({ success: true, cart: lastCart[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
}
import { NextResponse } from "next/server";
import { getCartCollection } from "@/lib/cart-db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const collection = await getCartCollection();
    const result = await collection.insertOne({ ...data, createdAt: new Date() });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
}
