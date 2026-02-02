import dbConnect from './mongodb'

export async function getDb() {
  const conn = await dbConnect()
  return conn.connection.db
}
