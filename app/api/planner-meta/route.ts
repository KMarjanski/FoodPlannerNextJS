import { NextResponse } from "next/server"
import { getPlannerLastModified, setPlannerLastModified } from "@/lib/planner-meta"

export async function GET() {
  try {
    const lastModified = await getPlannerLastModified();
    return NextResponse.json({ lastModified });
  } catch (e) {
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}

export async function POST() {
  try {
    await setPlannerLastModified();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}
