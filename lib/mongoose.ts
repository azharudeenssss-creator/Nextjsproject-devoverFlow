
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URL');

const cached = (global as any).mongoose ?? ((global as any).mongoose = { conn: null, promise: null });

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(MONGODB_URI!, { bufferCommands: false });
  return (cached.conn = await cached.promise);
}