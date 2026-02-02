import { getDb } from './get-db'

export async function getSettingsFromDb(userId: string) {
  const db = await getDb()
  const doc = await db.collection('settings').findOne({ userId })
  if (!doc) {
    // Default settings
    return {
      theme: 'dark',
      language: 'pl',
      weeksCount: 2
    }
  }
  return {
    theme: doc.theme || 'dark',
    language: doc.language || 'pl',
    weeksCount: doc.weeksCount || 2
  }
}

export async function saveSettingsToDb(userId: string, settings: { theme: string, language: string, weeksCount: number }) {
  const db = await getDb()
  await db.collection('settings').updateOne(
    { userId },
    { $set: settings },
    { upsert: true }
  )
}
