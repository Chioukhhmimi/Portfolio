import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const portfolioProjects = [
  {
    id: "dadycar",
    category: "Fleet Management",
    description: "Built a scalable fleet management system enabling companies to manage vehicles, service operations, and performance in a unified platform.",
    tags: ["Product Designer", "End-to-end UI/UX"]
  },
  {
    id: "focuscare",
    category: "Healthcare",
    description: "Pre-Surgical Clinical Workflow Platform designed to streamline healthcare operations and patient care workflows.",
    tags: ["Product Designer", "End-to-end UI/UX"]
  },
  {
    id: "shihany",
    category: "Sports",
    description: "Sports Operations & Club Management SaaS platform for clubs and sports organizations to manage operations.",
    tags: ["Product Designer", "End-to-end UI/UX"]
  },
  {
    id: "resaglob",
    category: "Travel",
    description: "B2B hotel booking system for travel agencies with streamlined reservation workflow.",
    tags: ["Product Designer", "End-to-end UI/UX"]
  }
];

const updateProjects = async () => {
  let client;
  try {
    console.log('✅ Connecting to MongoDB Atlas...');
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db();
    const collection = db.collection('projects');

    for (const portfolioProject of portfolioProjects) {
      const result = await collection.updateOne(
        { id: portfolioProject.id },
        {
          $set: {
            category: portfolioProject.category,
            description: portfolioProject.description,
            tags: portfolioProject.tags
          }
        }
      );
      console.log(`✅ Updated project "${portfolioProject.id}": ${result.modifiedCount} document(s) modified`);
    }

    console.log('✅ All projects updated successfully');

    await client.close();
    console.log('✅ Disconnected from MongoDB Atlas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Update failed:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

updateProjects();