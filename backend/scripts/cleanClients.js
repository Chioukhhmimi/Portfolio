import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanClients = async () => {
  let client;
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection('clients');

    // Delete clients with old schema (title/image fields instead of name/logo)
    const result = await collection.deleteMany({ title: { $exists: true } });
    console.log(`✅ Deleted ${result.deletedCount} old-format clients`);

    // Show remaining clients
    const clients = await collection.find({}).toArray();
    console.log('✅ Remaining clients:', clients.length);
    console.log(JSON.stringify(clients, null, 2));

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

cleanClients();