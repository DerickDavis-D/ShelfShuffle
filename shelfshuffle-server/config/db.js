import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

console.log('Environment Variables:', {
  MONGO_URI: process.env.MONGO_URI ? 'exists' : 'missing',
  JWT_SECRET: process.env.JWT_SECRET ? 'exists' : 'missing'
});

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  };

  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;