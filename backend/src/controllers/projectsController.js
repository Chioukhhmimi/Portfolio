import Project from '../models/Project.js';
import cloudinary from '../lib/cloudinary.js';
import { Readable } from 'stream';

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      resolve(null);
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/projects',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);

    readable.pipe(uploadStream);
  });
};

/**
 * Get all projects
 * Public: returns published projects sorted by order
 * Admin: returns all projects with optional filters
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const { status, featured, search, sort } = req.query;
    let query = {};

    const isAuthenticated = req.headers.authorization;

    if (!isAuthenticated) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
      ];
    }

    const sortField = sort === 'createdAt' ? '-createdAt' : 'order';
    const projects = await Project.find(query).sort(sortField);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get project by id (slug)
 * Public: returns only if status is published
 * Admin: returns regardless of status
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isAuthenticated = req.headers.authorization;

    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (!isAuthenticated && project.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new project
 * Protected route - requires authentication
 */
export const createProject = async (req, res, next) => {
  try {
    const {
      id,
      title,
      tag,
      tagColor,
      award,
      role,
      client,
      year,
      duration,
      status,
      featured,
      order,
      context,
      userInsight,
      overview,
      challenge,
      solution,
      team,
      ecosystem,
      designChallenges,
      outcomes,
      learnings,
      tools,
      heroImage,
      screens,
      nextProject,
    } = req.body;

    // Handle image upload
    let imageUrl = heroImage || '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const errors = [];

    if (!id) errors.push('id is required');
    else if (!/^[a-z0-9-]+$/.test(id)) errors.push('id must be lowercase, slug-safe characters only');

    if (!title) errors.push('title is required');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(', '),
      });
    }

    const existingProject = await Project.findOne({ id });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project with this id already exists',
      });
    }

    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const lastProject = await Project.findOne().sort('-order');
      finalOrder = lastProject ? lastProject.order + 1 : 0;
    }

    const project = new Project({
      id,
      title,
      tag,
      tagColor,
      award,
      role,
      client,
      year,
      duration,
      status: status || 'draft',
      featured: featured || false,
      order: finalOrder,
      context,
      userInsight,
      overview,
      challenge,
      solution,
      team: team || [],
      ecosystem: ecosystem || [],
      designChallenges,
      outcomes,
      learnings,
      tools: tools || [],
      heroImage: imageUrl,
      screens: screens || [],
      nextProject,
    });

    await project.save();

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing project
 * Protected route - requires authentication
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle image upload
    if (req.file) {
      updateData.heroImage = await uploadToCloudinary(req.file.buffer);
    }

    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    delete updateData.id;
    delete updateData._id;
    delete updateData.createdAt;

    const updatedProject = await Project.findOneAndUpdate(
      { id },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project
 * Protected route - requires authentication
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await Project.deleteOne({ id });

    res.status(200).json({
      success: true,
      message: 'Project deleted',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Archive a project
 * Protected route - requires authentication
 */
export const archiveProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    project.status = 'archived';
    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Duplicate a project
 * Protected route - requires authentication
 */
export const duplicateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const originalProject = await Project.findOne({ id });

    if (!originalProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    let newId = `${id}-copy`;
    let counter = 1;

    while (await Project.findOne({ id: newId })) {
      newId = `${id}-copy-${counter}`;
      counter++;
    }

    const lastProject = await Project.findOne().sort('-order');
    const newOrder = lastProject ? lastProject.order + 1 : 0;

    const projectData = originalProject.toObject();
    delete projectData._id;
    delete projectData.createdAt;
    delete projectData.updatedAt;

    const duplicatedProject = new Project({
      ...projectData,
      id: newId,
      status: 'draft',
      order: newOrder,
    });

    await duplicatedProject.save();

    res.status(201).json({
      success: true,
      data: duplicatedProject,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update project status
 * Protected route - requires authentication
 */
export const updateProjectStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['draft', 'published', 'archived'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    project.status = status;
    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reorder multiple projects
 * Protected route - requires authentication
 */
export const reorderProjects = async (req, res, next) => {
  try {
    const { projects } = req.body;

    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({
        success: false,
        message: 'projects array is required',
      });
    }

    const bulkOps = projects.map((p) => ({
      updateOne: {
        filter: { id: p.id },
        update: { order: p.order },
      },
    }));

    await Project.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: 'Projects reordered',
    });
  } catch (error) {
    next(error);
  }
};