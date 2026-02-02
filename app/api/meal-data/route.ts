import { updateWeekData } from "@/lib/meal-data-service"

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, days } = body;
    if (!id || !days) {
      return NextResponse.json({ error: "Missing id or days" }, { status: 400 });
    }
    const updated = await updateWeekData(id, days);
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}
