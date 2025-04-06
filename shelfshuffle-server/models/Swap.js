// backend/models/Swap.js
import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  offeredBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

swapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Swap = mongoose.model('Swap', swapSchema);
export default Swap;