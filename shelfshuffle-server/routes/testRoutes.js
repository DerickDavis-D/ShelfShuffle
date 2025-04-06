// backend/routes/testRoutes.js
import express from 'express';
import Book from '../models/Book.js';
import User from '../models/User.js';

const router = express.Router();

// Test user creation
router.post('/test-user', async (req, res) => {
  try {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Test book creation
router.post('/test-book', async (req, res) => {
  try {
    const book = await Book.create({
      title: 'Sample Book',
      author: 'Sample Author',
      owner: req.body.userId, // Pass a valid user ID
      condition: 'Good'
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Test swap creation
router.post('/test-swap', async (req, res) => {
  try {
    const swap = await Swap.create({
      requester: req.body.requesterId,
      recipient: req.body.recipientId,
      requestedBook: req.body.requestedBookId,
      status: 'Pending'
    });
    res.status(201).json(swap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;