import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';
import { normalizeMediumContent, extractImageUrl } from '../src/utils/medium.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MEDIUM_FEED_URL = 'https://medium.com/feed/@hmimichiouukh';

const parser = new Parser();

const extractExcerpt = (content, limit = 150) => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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
      const mediumUrl = item.link;
      const existingPost = await collection.findOne({ mediumUrl });

      if (existingPost) {
        console.log(`⏭️  Skipping existing: ${item.title}`);
        continue;
      }

      const categories = item.categories || [];
      const mainTag = categories[0] || 'Article';
      const tags = categories.length > 0 ? categories : [mainTag];
      const rawContent = item['content:encoded'] || item.content || item.contentSnippet || '';
      const content = normalizeMediumContent(rawContent);
      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;

      const slug = slugify(item.title);

      const post = {
        title: item.title,
        slug,
        mediumUrl,
        content,
        excerpt: extractExcerpt(content),
        coverImage: extractImageUrl(content),
        readingTime: Math.ceil(wordCount / 200),
        tags,
        status: 'published',
        featured: false,
        publishedAt: new Date(item.pubDate || new Date()),
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
