import Blog from '../models/Blog.js';
import Parser from 'rss-parser';
import { normalizeMediumContent, extractImageUrl } from '../utils/medium.js';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@hmimichiouukh';

const extractExcerpt = (content, limit = 150) => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getAllBlogs = async (req, res, next) => {
  try {
    const { status, featured, search } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      mediumUrl,
      excerpt,
      coverImage,
      readingTime,
      tags,
      content,
      status,
      featured,
      publishedAt,
    } = req.body;

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists',
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      mediumUrl,
      excerpt,
      coverImage,
      readingTime,
      tags: tags || [],
      content,
      status: status || 'draft',
      featured: featured || false,
      publishedAt,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    delete updateData._id;
    delete updateData.createdAt;

    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted',
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const importFromMedium = async (req, res, next) => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(MEDIUM_FEED_URL);

    let importedCount = 0;
    const imported = [];
    const errors = [];

    for (const item of feed.items) {
      try {
        const mediumUrl = item.link;
        const existing = await Blog.findOne({ mediumUrl });

        if (existing) continue;

        const categories = item.categories || [];
        const mainTag = categories[0] || 'Article';
        const tags = categories.length > 0 ? categories : [mainTag];
        const rawContent = item['content:encoded'] || item.content || item.contentSnippet || '';
        const content = normalizeMediumContent(rawContent);
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;

        let slug = slugify(item.title);
        let slugSuffix = 0;
        while (await Blog.findOne({ slug })) {
          slugSuffix++;
          slug = `${slugify(item.title)}-${slugSuffix}`;
        }

        const blog = await Blog.create({
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
        });

        imported.push(blog);
        importedCount++;
      } catch (itemError) {
        errors.push({ title: item.title, error: itemError.message });
      }
    }

    res.status(200).json({
      success: true,
      message: `Imported ${importedCount} new posts from Medium`,
      count: importedCount,
      data: imported,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    next(error);
  }
};