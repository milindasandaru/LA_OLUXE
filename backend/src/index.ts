import express = require("express");
import cors = require("cors");
import mongoose = require("mongoose");
import dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Database connection status
let dbStatus = {
  connected: false,
  message: "Not connected",
  error: null as string | null
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      dbStatus.message = "MONGO_URI not found in environment variables";
      dbStatus.error = "Missing MONGO_URI";
      console.error("❌ Database connection failed: MONGO_URI not found in environment variables");
      return;
    }

    console.log("🔄 Attempting to connect to MongoDB...");
    
    await mongoose.connect(mongoUri);
    
    dbStatus.connected = true;
    dbStatus.message = "Connected to MongoDB successfully";
    dbStatus.error = null;
    
    console.log("✅ MongoDB connected successfully");
    
  } catch (error) {
    dbStatus.connected = false;
    dbStatus.message = "Failed to connect to MongoDB";
    dbStatus.error = error instanceof Error ? error.message : "Unknown error";
    
    console.error("❌ Database connection failed:", error);
    console.log("⚠️  Server will continue running without database connection");
  }
};

// Health check endpoint with database status
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true,
    server: "running",
    database: dbStatus
  });
});

// Database status endpoint
app.get("/api/db-status", (req, res) => {
  res.json({
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Initialize database connection
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  dbStatus.connected = true;
  dbStatus.message = "Connected to MongoDB successfully";
  dbStatus.error = null;
  console.log("✅ MongoDB connection established");
});

mongoose.connection.on('error', (err) => {
  dbStatus.connected = false;
  dbStatus.message = "MongoDB connection error";
  dbStatus.error = err.message;
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on('disconnected', () => {
  dbStatus.connected = false;
  dbStatus.message = "MongoDB disconnected";
  dbStatus.error = "Connection lost";
  console.log("⚠️  MongoDB disconnected");
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("🔄 Shutting down gracefully...");
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error);
  }
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💾 Database status: http://localhost:${PORT}/api/db-status`);
});
