import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const checkProjects = async () => {
  let client;
  try {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db();
    const projects = await db.collection('projects').find({}, { projection: { id: 1, heroImage: 1, image: 1 } }).toArray();
    console.log(JSON.stringify(projects, null, 2));
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    if (client) await client.close();
    process.exit(1);
  }
};

checkProjects();