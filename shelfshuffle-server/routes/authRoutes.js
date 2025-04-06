import express from 'express';
import { validateUser } from '../models/User.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


// @route    POST /api/users/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }
  
    try {
      // 2. Find user by email (including password field)
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // 3. Verify password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // 4. Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
      );
  
      // 5. Remove password from response
      user.password = undefined;
  
      // 6. Send response
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
  
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error during authentication'
      });
    }
  });

// @route    POST /api/users/register
// @desc     Register a new user
// @access   Public
router.post('/register', async (req, res) => {
  // 1. Validate Request Body
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/"/g, '')
    });
  }

  const { name, email, password } = req.body;

  try {
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // 3. Create new user
    const user = new User({
      name,
      email,
      password // Will be hashed by pre-save hook
    });

    // 4. Save user to database
    await user.save();

    // 5. Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    // 6. Send response
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

export default router;