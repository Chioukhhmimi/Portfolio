import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const previewImages = [
  { filename: 'dadycar.svg', projectId: 'dadycar', projectName: 'DadyCar' },
  { filename: 'focuse.svg', projectId: 'focuscare', projectName: 'FocusCare' },
  { filename: 'Shihany.svg', projectId: 'shihany', projectName: 'Shihany' },
  { filename: 'resglob.svg', projectId: 'resaglob', projectName: 'Resaglob' },
];

const migrate = async () => {
  const results = {};
  
  console.log('📄 Reading preview images from src/assets/Projects/\n');
  
  for (const img of previewImages) {
    const filePath = path.resolve(__dirname, `../../src/assets/Projects/${img.filename}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${img.filename}: File not found`);
      continue;
    }
    
    console.log(`⬆️  Uploading ${img.filename}...`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'portfolio/previews',
        resource_type: 'image',
        public_id: `${img.projectId}-preview`,
      });
      
      results[img.filename] = result.secure_url;
      console.log(`✅ ${img.projectName}: ${result.secure_url}\n`);
    } catch (error) {
      console.log(`❌ ${img.filename}: Upload failed - ${error.message}\n`);
    }
  }
  
  const outputPath = path.resolve(__dirname, 'preview-migration-result.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`💾 Saved results to ${outputPath}`);
};

migrate();