import mongoose from 'mongoose';

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}