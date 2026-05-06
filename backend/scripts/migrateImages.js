import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../src/lib/cloudinary.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.resolve(__dirname, '../../src/assets/Projects');

const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];

const getImageFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase()))
    .map(file => path.join(dir, file))
    .sort();
};

const uploadToCloudinary = async (filePath, folder) => {
  return new Promise((resolve, reject) => {
    const publicId = path.basename(filePath, path.extname(filePath));
    
    cloudinary.uploader.upload(filePath, {
      folder: `portfolio/projects/${folder}`,
      public_id: publicId,
      resource_type: 'image',
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

const migrate = async () => {
  const result = {};
  
  try {
    const folders = fs.readdirSync(projectsDir).filter(item => {
      const itemPath = path.join(projectsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    console.log(`Found ${folders.length} project folders: ${folders.join(', ')}`);
    console.log('---');

    for (const folder of folders) {
      const folderPath = path.join(projectsDir, folder);
      const slug = folder.toLowerCase();
      const files = getImageFiles(folderPath);
      
      console.log(`\nProcessing: ${folder}`);
      console.log(`  Found ${files.length} images`);

      if (files.length === 0) {
        console.log(`  ⚠️  No images found, skipping`);
        continue;
      }

      const uploadedUrls = {
        cover: null,
        screens: [],
      };

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = path.basename(file);
        
        try {
          console.log(`  Uploading: ${fileName}`);
          const url = await uploadToCloudinary(file, slug);
          
          if (i === 0) {
            uploadedUrls.cover = url;
            console.log(`    → cover: ${url}`);
          } else {
            uploadedUrls.screens.push(url);
            console.log(`    → screen: ${url}`);
          }
        } catch (err) {
          console.error(`    ❌ Failed: ${err.message}`);
        }
      }

      result[slug] = uploadedUrls;
    }

    const outputPath = path.join(__dirname, 'migration-result.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`\n---`);
    console.log(`✅ Migration complete! Results saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

migrate();