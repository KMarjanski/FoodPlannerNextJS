import dbConnect from "./mongodb"
import mongoose from "mongoose"

const plannerMetaSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  lastModified: { type: Date, default: Date.now },
})

const PlannerMetaModel = mongoose.models.PlannerMeta || mongoose.model("PlannerMeta", plannerMetaSchema)

export async function getPlannerLastModified(): Promise<Date> {
  await dbConnect()
  const meta = await PlannerMetaModel.findOne({ key: "planner" })
  return meta?.lastModified || new Date(0)
}

export async function setPlannerLastModified(date: Date = new Date()): Promise<void> {
  await dbConnect()
  await PlannerMetaModel.findOneAndUpdate(
    { key: "planner" },
    { $set: { lastModified: date } },
    { upsert: true }
  )
}
