import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express(); 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'ADORA API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 
