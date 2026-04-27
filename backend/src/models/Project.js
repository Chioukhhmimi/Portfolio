import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  tagColor: {
    type: String,
  },
  award: {
    type: String,
    default: null,
  },
  role: {
    type: String,
  },
  client: {
    type: String,
  },
  year: {
    type: String,
  },
  duration: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  context: {
    type: String,
  },
  userInsight: {
    type: String,
  },
  overview: {
    type: String,
  },
  challenge: {
    type: String,
  },
  solution: {
    type: String,
  },
  team: [{
    type: String,
  }],
  ecosystem: [{
    name: String,
    type: String,
    user: String,
    description: String,
  }],
  designChallenges: [{
    number: Number,
    title: String,
    problem: String,
    solution: String,
    insight: String,
  }],
  outcomes: [{
    type: String,
  }],
  learnings: [{
    title: String,
    body: String,
  }],
  tools: [{
    type: String,
  }],
  heroImage: {
    type: String,
  },
  screens: [{
    label: String,
    src: String,
  }],
  nextProject: {
    title: String,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;