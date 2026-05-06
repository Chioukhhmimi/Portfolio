import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  heroImage: { type: String },
  screens: [{ label: String, src: String }],
}, { strict: false });

const Project = mongoose.model('Project', projectSchema);

const linkImages = async () => {
  let conn;
  
  try {
    console.log('📄 Reading migration-result.json...');
    const resultPath = path.join(__dirname, 'migration-result.json');
    const migrationData = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));
    
    const projectSlugs = Object.keys(migrationData);
    console.log(`Found ${projectSlugs.length} projects to link\n---`);
    
    console.log('🔌 Connecting to MongoDB...');
    conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n---');
    
    for (const slug of projectSlugs) {
      const data = migrationData[slug];
      
      if (!data.cover && data.screens.length === 0) {
        console.log(`⚠️  ${slug}: No images to link, skipping`);
        continue;
      }
      
      const project = await Project.findOne({ id: slug });
      
      if (!project) {
        console.log(`❌ ${slug}: Project not found in MongoDB`);
        continue;
      }
      
      const updates = {};
      
      if (data.cover) {
        updates.heroImage = data.cover;
      }
      
      if (data.screens && data.screens.length > 0) {
        updates.screens = data.screens.map((src, i) => ({
          label: `Screen ${i + 1}`,
          src: src,
        }));
      }
      
      await Project.updateOne({ id: slug }, updates);
      
      console.log(`✅ ${slug}:`);
      if (data.cover) console.log(`   📷 cover: ${data.cover}`);
      if (data.screens.length > 0) console.log(`   🖼️  screens: ${data.screens.length} images`);
    }
    
    console.log('\n---');
    console.log('✅ All images linked to projects!');
    
    await conn.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Link failed:', error.message);
    if (conn) await conn.disconnect();
    process.exit(1);
  }
};

linkImages();