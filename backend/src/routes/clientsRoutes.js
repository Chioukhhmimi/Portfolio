import express from 'express';
import {
  getAllClients,
  createClient,
  deleteClient,
} from '../controllers/clientsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllClients);
router.post('/', protect, createClient);
router.delete('/:id', protect, deleteClient);

export default router;