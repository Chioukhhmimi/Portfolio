import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME;

    if (!email || !password || !name) {
      console.error('Missing env vars: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME');
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Admin user ${email} already exists`);
      await mongoose.disconnect();
      process.exit(0);
    }

    const user = await User.create({ name, email, password });
    console.log(`Admin user created: ${user.email}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
