import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  mediumUrl: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  readingTime: {
    type: Number,
  },
  content: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;