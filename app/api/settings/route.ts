import { NextRequest, NextResponse } from 'next/server'
import { getSettingsFromDb, saveSettingsToDb } from '@/lib/settings-db'

export async function GET(req: NextRequest) {
  // For demo: get settings for userId=1
  const settings = await getSettingsFromDb('1')
  return NextResponse.json(settings)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  // For demo: save settings for userId=1
  await saveSettingsToDb('1', body)
  return NextResponse.json({ success: true })
}
