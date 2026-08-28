import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const fix = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const col = client.db().collection('blogs');
  const posts = await col.find({}).toArray();
  for (const post of posts) {
    const slug = slugify(post.title);
    await col.updateOne({ _id: post._id }, { $set: { slug } });
    console.log(`${post.title} → ${slug}`);
  }
  await client.close();
  console.log('Done');
};

fix();
