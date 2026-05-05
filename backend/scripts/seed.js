import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectsData } from '../../src/data/projectsData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mapProject = (project) => ({
  id: project.id,
  title: project.title,
  tag: project.tag || '',
  tagColor: project.tagColor || 'blue',
  award: project.award || null,
  role: project.role || '',
  client: project.client || '',
  year: project.year || '',
  duration: project.duration || '',
  status: 'published',
  featured: project.featured || false,
  order: project.order || 0,
  context: project.context || '',
  userInsight: project.userInsight || '',
  overview: project.overview || '',
  challenge: project.challenge || '',
  solution: project.solution || '',
  team: project.team || [],
  ecosystem: project.ecosystem || [],
  designChallenges: project.designChallenges || [],
  outcomes: project.outcomes || [],
  learnings: project.learnings || [],
  tools: project.tools || [],
  heroImage: project.heroImage || '',
  screens: (project.screens || []).map(s => ({ label: s.label, src: s.image })),
  nextProject: project.nextProject ? { title: project.nextProject.title || '', url: project.nextProject.id ? `/${project.nextProject.id}` : '' } : { title: '', url: '' },
  createdAt: new Date(),
  updatedAt: new Date(),
});

const seed = async () => {
  let client;
  try {
    console.log('✅ Connecting to MongoDB Atlas...');
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db();
    const collection = db.collection('projects');

    console.log('🗑️ Clearing existing projects...');
    await collection.deleteMany({});
    console.log('✅ Cleared existing projects');

    const mappedProjects = projectsData.map(mapProject);
    await collection.insertMany(mappedProjects);
    console.log(`✅ Inserted ${mappedProjects.length} projects successfully`);

    await client.close();
    console.log('✅ Disconnected from MongoDB Atlas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    if (client) await client.close();
    process.exit(1);
  }
};

seed();