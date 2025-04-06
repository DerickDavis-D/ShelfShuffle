import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';

// Password complexity configuration
const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

// Joi validation schema
export const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: JoiPasswordComplexity(complexityOptions).required()
  });

  return schema.validate(user);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    select: false,
    validate: {
      validator: function(v) {
        // Skip validation if already hashed
        if (v.startsWith('$2a$')) return true;
        // Your password requirements
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: 'Password must contain 8+ chars with uppercase, lowercase, number and special char'
    }
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;