import { NextResponse } from "next/server"
import { fetchRecipes } from "@/lib/recipes-data-service"

export async function GET() {
  const data = await fetchRecipes()
  return NextResponse.json(data)
}
