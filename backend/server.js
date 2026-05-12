import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/lib/db.js';

async function startServer() {
  await connectDB();
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('MongoDB connected');
  });
}

startServer();

export default app;