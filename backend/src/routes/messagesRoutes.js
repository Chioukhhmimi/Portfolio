import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  markAsRead,
} from '../controllers/messagesController.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, getAllMessages);
router.get('/:id', protect, getMessageById);
router.put('/:id', protect, updateMessage);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

export default router;