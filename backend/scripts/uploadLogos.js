import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../src/lib/cloudinary.js';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const logos = [
  { id: 'adoc', name: 'ADOC', filename: 'ADOC.svg' },
  { id: 'twirex', name: 'Twirex', filename: 'Twirex.svg' },
  { id: 'shihany', name: 'Shihany', filename: 'shihany.svg' },
  { id: 'resoglob', name: 'Resoglob', filename: 'Resoglob.svg' },
  { id: 'focuscare', name: 'FocusCare', filename: 'FocuseCare.svg' },
  { id: 'dadycar', name: 'DadyCar', filename: 'dadycar.svg' },
];

const uploadLogos = async () => {
  let client;
  try {
    console.log('📤 Uploading logos to Cloudinary...');
    
    const clientData = [];
    
    for (const logo of logos) {
      const filePath = path.resolve(__dirname, `../../src/assets/logos/${logo.filename}`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${logo.filename}`);
        continue;
      }
      
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'portfolio/clients',
        public_id: logo.id,
        resource_type: 'image',
      });
      
      console.log(`✅ Uploaded ${logo.name}: ${result.secure_url}`);
      
      clientData.push({
        id: logo.id,
        name: logo.name,
        logo: result.secure_url,
      });
    }

    console.log('\n📦 Connecting to MongoDB...');
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('clients');
    
    console.log('🗑️ Clearing existing clients...');
    await collection.deleteMany({});
    
    await collection.insertMany(clientData);
    console.log(`✅ Inserted ${clientData.length} clients to MongoDB`);
    
    await client.close();
    console.log('✅ Disconnected from MongoDB Atlas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

uploadLogos();