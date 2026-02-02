
export async function updateWeekData(id: string, days: any[], label?: string) {
  await dbConnect();
  const updateObj: any = { days, lastModified: new Date() };
  if (label) updateObj.label = label;
  const updated = await WeekDataModel.findOneAndUpdate(
    { id },
    { $set: updateObj },
    { new: true, upsert: true }
  ).lean();
  return updated;
}
import dbConnect from "./mongodb"
import type { WeekData } from "./meal-data"
import mongoose from "mongoose"

const weekDataSchema = new mongoose.Schema({
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
  lastModified: { type: Date, default: Date.now },
})

const WeekDataModel = mongoose.models.WeekData || mongoose.model("WeekData", weekDataSchema)

export async function fetchMealData(): Promise<WeekData[]> {
  await dbConnect()
  const data = await WeekDataModel.find().lean()
  return data as WeekData[]
}
