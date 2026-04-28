import Project from '../models/Project.js';

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

    const errors = [];

    if (!id) errors.push('id is required');
    else if (!/^[a-z0-9-]+$/.test(id)) errors.push('id must be lowercase, slug-safe characters only');

    if (!title) errors.push('title is required');
    else if (title.length < 3) errors.push('title must be at least 3 characters');

    if (!tag) errors.push('tag is required');
    if (!role) errors.push('role is required');
    if (!client) errors.push('client is required');
    if (!year) errors.push('year is required');

    if (!overview) errors.push('overview is required');
    else if (overview.length < 20) errors.push('overview must be at least 20 characters');

    if (!challenge) errors.push('challenge is required');
    else if (challenge.length < 20) errors.push('challenge must be at least 20 characters');

    if (!solution) errors.push('solution is required');
    else if (solution.length < 20) errors.push('solution must be at least 20 characters');

    if (!designChallenges || !Array.isArray(designChallenges) || designChallenges.length < 1) {
      errors.push('designChallenges is required with at least 1 item');
    }

    if (!outcomes || !Array.isArray(outcomes) || outcomes.length < 1) {
      errors.push('outcomes is required with at least 1 item');
    }

    if (!learnings || !Array.isArray(learnings) || learnings.length < 1) {
      errors.push('learnings is required with at least 1 item');
    }

    if (!nextProject?.title) errors.push('nextProject.title is required');
    if (!nextProject?.url) errors.push('nextProject.url is required');
    else if (!nextProject.url.startsWith('/')) errors.push('nextProject.url must start with /');

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
      heroImage,
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