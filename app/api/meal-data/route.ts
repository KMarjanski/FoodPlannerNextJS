
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;


const weekSchema = new mongoose.Schema({
  id: String,
  label: String,
  days: [
    {
      day: String,
      breakfast: [
        {
          id: String,
          name: String,
          category: String,
        },
      ],
      lunch: [
        {
          id: String,
          name: String,
          category: String,
        },
      ],
      dinner: [
        {
          id: String,
          name: String,
          category: String,
        },
      ],
    },
  ],
});

const WeekModel = mongoose.models.WeekData || mongoose.model("WeekData", weekSchema, "mealData");

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }
    const weeks = await WeekModel.find({}).lean();
    return NextResponse.json(weeks);
  } catch (e) {
    return NextResponse.json({ error: "Database error", details: e }, { status: 500 });
  }
}
