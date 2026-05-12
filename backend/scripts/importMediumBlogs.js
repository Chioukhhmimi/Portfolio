import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MEDIUM_FEED_URL = 'https://medium.com/feed/@hmimichiouukh';

const parser = new Parser();

const extractImageUrl = (content) => {
  if (!content) return null;
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch) return imgMatch[1];
  
  const mediaMatch = content.match(/url="([^">]+\.(jpg|jpeg|png|gif|webp))"/i);
  if (mediaMatch) return mediaMatch[1];
  
  return null;
};

const extractExcerpt = (content, limit = 150) => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

const getTagColor = (tag) => {
  const tagLower = (tag || '').toLowerCase();
  if (tagLower.includes('design') || tagLower.includes('ux')) return 'blue';
  if (tagLower.includes('product')) return 'teal';
  if (tagLower.includes('ai') || tagLower.includes('tool')) return 'orange';
  if (tagLower.includes('case') || tagLower.includes('study')) return 'green';
  return 'default';
};

const importFromMedium = async () => {
  let client;
  try {
    console.log('📡 Fetching Medium RSS feed...');
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    
    console.log(`✅ Found ${feed.items.length} posts`);
    
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('blogs');
    
    let importedCount = 0;
    
    for (const item of feed.items) {
      const guid = item.guid || item.link;
      const existingPost = await collection.findOne({ guid });
      
      if (existingPost) {
        console.log(`⏭️ Skipping existing: ${item.title}`);
        continue;
      }
      
      const categories = item.categories || [];
      const mainTag = categories[0] || 'Article';
      
      const post = {
        id: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now(),
        guid: guid,
        title: item.title,
        mediumUrl: item.link,
        excerpt: extractExcerpt(item.content || item.contentSnippet),
        readingTime: Math.ceil((item.content?.split(' ').length || 200) / 200),
        tag: mainTag,
        tagColor: getTagColor(mainTag),
        status: 'published',
        featured: false,
        order: importedCount,
        createdAt: new Date(item.pubDate || new Date()),
        updatedAt: new Date(),
      };
      
      await collection.insertOne(post);
      console.log(`✅ Imported: ${item.title}`);
      importedCount++;
    }
    
    console.log(`\n🎉 Successfully imported ${importedCount} new posts`);
    
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

importFromMedium();