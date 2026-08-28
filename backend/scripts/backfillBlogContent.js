import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';
import { normalizeMediumContent, extractImageUrl } from '../src/utils/medium.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MEDIUM_FEED_URL = 'https://medium.com/feed/@hmimichiouukh';

const backfillContent = async () => {
  let client;
  try {
    console.log('📡 Fetching Medium RSS feed...');
    const parser = new Parser();
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    console.log(`✅ Found ${feed.items.length} posts`);

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db();
    const collection = db.collection('blogs');

    let updatedCount = 0;

    for (const item of feed.items) {
      const mediumUrl = item.link;
      const rawContent = item['content:encoded'] || item.content || item.contentSnippet || '';
      const content = normalizeMediumContent(rawContent);

      if (!content || content.length < 50) {
        console.log(`⏭️  No content for: ${item.title}`);
        continue;
      }

      const existing = await collection.findOne({ mediumUrl });
      if (!existing) {
        console.log(`⏭️  Post not in DB: ${item.title}`);
        continue;
      }

      if (existing.content && existing.content.length > 100) {
        console.log(`⏭️  Already has content: ${item.title}`);
        continue;
      }

      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const excerpt = content.replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...';
      const coverImage = extractImageUrl(content) || existing.coverImage;

      await collection.updateOne(
        { mediumUrl },
        {
          $set: {
            content,
            excerpt,
            coverImage,
            readingTime: Math.ceil(wordCount / 200),
            updatedAt: new Date(),
          },
        }
      );

      console.log(`✅ Updated: ${item.title} (${content.length} chars)`);
      updatedCount++;
    }

    console.log(`\n🎉 Updated ${updatedCount} posts with content`);
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

backfillContent();
