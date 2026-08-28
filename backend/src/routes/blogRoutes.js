import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  importFromMedium,
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/import-medium', protect, importFromMedium);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
