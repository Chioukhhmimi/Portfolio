import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const link = async () => {
  let client;
  
  const resultPath = path.resolve(__dirname, 'preview-migration-result.json');
  
  if (!fs.existsSync(resultPath)) {
    console.log('❌ preview-migration-result.json not found');
    console.log('   Run npm run migrate:previews first');
    process.exit(1);
  }
  
  const results = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));
  
  console.log('📄 Reading preview-migration-result.json...');
  console.log(`Found ${Object.keys(results).length} previews to link\n`);
  
  console.log('🔌 Connecting to MongoDB...');
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log('✅ Connected to MongoDB\n');
  
  const db = client.db();
  const collection = db.collection('projects');
  
  const projectIdMap = {
    'dadycar.svg': 'dadycar',
    'focuse.svg': 'focuscare',
    'Shihany.svg': 'shihany',
    'resglob.svg': 'resaglob',
  };
  
  for (const [filename, url] of Object.entries(results)) {
    const projectId = projectIdMap[filename];
    
    if (!projectId) {
      console.log(`❌ ${filename}: Could not map to project ID`);
      continue;
    }
    
    try {
      const updated = await collection.updateOne(
        { id: projectId },
        { $set: { image: url } }
      );
      
      if (updated.modifiedCount > 0) {
        console.log(`✅ Updated ${projectId} preview`);
      } else {
        console.log(`⚠️  ${projectId}: No changes made (already had same value or not found)`);
      }
    } catch (error) {
      console.log(`❌ ${projectId}: Update failed - ${error.message}`);
    }
  }
  
  console.log('\n👋 Disconnecting from MongoDB...');
  await client.close();
  console.log('✅ Done');
};

link();