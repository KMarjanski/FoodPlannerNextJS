/* eslint-disable no-unused-vars */
import _mongoose from "mongoose";
import type { Mongoose } from "mongoose";

declare global {
  var _mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: "Foodies",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      maxPoolSize: 10,
    };
    cached.promise = _mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ Database connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("❌ Database connection failed:", error.message);
      throw error;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Connection error:", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;