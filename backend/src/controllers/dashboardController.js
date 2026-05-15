import Project from '../models/Project.js';
import Client from '../models/Client.js';
import Message from '../models/Message.js';
import Blog from '../models/Blog.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      draftProjects,
      archivedProjects,
      totalClients,
      totalMessages,
      unreadMessages,
      totalBlogPosts,
      publishedBlogPosts,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Project.countDocuments({ featured: true }),
      Project.countDocuments({ status: 'draft' }),
      Project.countDocuments({ status: 'archived' }),
      Client.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        publishedProjects,
        featuredProjects,
        draftProjects,
        archivedProjects,
        totalClients,
        totalMessages,
        unreadMessages,
        totalBlogPosts,
        publishedBlogPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};