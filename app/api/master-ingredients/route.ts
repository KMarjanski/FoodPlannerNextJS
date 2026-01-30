
import { NextResponse } from "next/server"
import { fetchMasterIngredients, addMasterIngredient } from "@/lib/recipes-data-service"

export async function GET() {
  const data = await fetchMasterIngredients()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  try {
    const { name, category } = await req.json();
    if (!name || !category) {
      return NextResponse.json({ error: "Missing name or category" }, { status: 400 });
    }
    // Dodaj składnik do bazy (MongoDB wygeneruje _id)
    const newIngredient = await addMasterIngredient({ name, category });
    return NextResponse.json(newIngredient, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error" }, { status: 500 });
  }
}
