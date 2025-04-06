// backend/models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the book title'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Please enter the author name'],
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  images: [{
    url: String,
    publicId: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Pending', 'Swapped'],
    default: 'Available'
  },
  genres: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;