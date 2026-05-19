import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI environment variable is not defined. Using local fallback.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const uri = MONGODB_URI || "mongodb://127.0.0.1:27017/afterlight";
    
    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log("=> MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("=> MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
}
