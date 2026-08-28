import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';
import { normalizeMediumContent, extractImageUrl } from '../src/utils/medium.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MEDIUM_FEED_URL = 'https://medium.com/feed/@hmimichiouukh';

/**
 * Re-normalize all existing blog posts to fix images.
 * Fetches fresh content from Medium RSS and applies normalizeMediumContent.
 */
const migrateBlogImages = async () => {
  let client;
  try {
    console.log('📡 Fetching Medium RSS feed...');
    const parser = new Parser();
    const feed = await parser.parseURL(MEDIUM_FEED_URL);
    console.log(`✅ Found ${feed.items.length} posts in feed`);

    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db();
    const collection = db.collection('blogs');

    let updatedCount = 0;
    let skippedCount = 0;

    for (const item of feed.items) {
      const mediumUrl = item.link;
      const existing = await collection.findOne({ mediumUrl });

      if (!existing) {
        console.log(`⏭️  Not in DB: ${item.title}`);
        skippedCount++;
        continue;
      }

      const rawContent = item['content:encoded'] || item.content || item.contentSnippet || '';
      const normalizedContent = normalizeMediumContent(rawContent);
      const newCoverImage = extractImageUrl(normalizedContent);

      // Check if anything changed
      const contentChanged = existing.content !== normalizedContent;
      const coverChanged = existing.coverImage !== newCoverImage;

      if (!contentChanged && !coverChanged) {
        console.log(`⏭️  No change: ${item.title}`);
        skippedCount++;
        continue;
      }

      const wordCount = normalizedContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const excerpt = normalizedContent.replace(/<[^>]*>/g, '').trim().substring(0, 150) + '...';

      await collection.updateOne(
        { mediumUrl },
        {
          $set: {
            content: normalizedContent,
            excerpt,
            coverImage: newCoverImage || existing.coverImage,
            readingTime: Math.ceil(wordCount / 200),
            updatedAt: new Date(),
          },
        }
      );

      console.log(`✅ Updated: ${item.title}`);
      if (contentChanged) console.log(`   Content: ${existing.content?.length || 0} → ${normalizedContent.length} chars`);
      if (coverChanged) console.log(`   Cover: ${existing.coverImage || 'none'} → ${newCoverImage}`);
      updatedCount++;
    }

    console.log(`\n🎉 Updated ${updatedCount} posts, skipped ${skippedCount}`);
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

migrateBlogImages();
