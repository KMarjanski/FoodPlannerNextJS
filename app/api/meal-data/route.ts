
import { NextResponse } from "next/server"
import { fetchMealData } from "@/lib/meal-data-service"

export async function GET() {
  try {
    const data = await fetchMealData();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}
