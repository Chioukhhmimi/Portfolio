import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  archiveProject,
  duplicateProject,
  updateProjectStatus,
  reorderProjects,
} from '../controllers/projectsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);

router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.patch('/:id/archive', protect, archiveProject);
router.patch('/:id/duplicate', protect, duplicateProject);
router.patch('/:id/status', protect, updateProjectStatus);
router.patch('/reorder', protect, reorderProjects);

export default router;