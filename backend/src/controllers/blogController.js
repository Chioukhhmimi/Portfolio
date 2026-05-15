import Blog from '../models/Blog.js';

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