import express from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
} from '../controllers/clientsController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createClient);
router.get('/', getAllClients);
router.delete('/:id', protect, deleteClient);
router.get('/:id', getClientById);

export default router;
