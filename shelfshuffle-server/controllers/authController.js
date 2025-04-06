import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check for existing user
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    // Create user with hashed password
    const user = await User.create({
      name,
      email,
      password // Will be hashed by the pre-save hook
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role // Make sure to include role in response
    });

  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400);
      throw new Error(messages.join(', '));
    }
    
    // Handle other errors
    res.status(500);
    throw new Error('Registration failed. Please try again.');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  try {
    // Check for user email and include password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500);
    throw new Error('Login failed. Please try again.');
  }
});