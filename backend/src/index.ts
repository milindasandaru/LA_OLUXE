import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes after env is loaded
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

// Initialize JWT utilities
import { jwtUtil } from './utils/jwt';
jwtUtil.init();

const app = express();
// Create HTTP server & Socket.IO layer
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000','http://localhost:3002'],
    credentials: true
  }
});

interface SocketUserMeta { userId: string; email: string; }
const onlineUsers = new Map<string, SocketUserMeta>();

// Simple auth via query token (improve later with proper handshake auth)
io.use((socket, next) => {
  next();
});

const userRoom = (userId: string) => `user:${userId}`;

io.on('connection', (socket: Socket) => {
  socket.on('registerUser', (data: SocketUserMeta) => {
    onlineUsers.set(socket.id, data);
    if (data.userId) {
      socket.join(userRoom(data.userId));
    }
    socket.emit('registered', { success: true });
  });

  socket.on('sendReply', (payload: { notificationId: string; text: string }) => {
    const meta = onlineUsers.get(socket.id);
    const reply = { ...payload, at: new Date().toISOString(), sender: 'system' };
    // Echo back to sender
    socket.emit('newReply', reply);
    // Future: find recipient and emit to their room
    if (meta?.userId) {
      io.to(userRoom(meta.userId)).emit('replyAck', { notificationId: payload.notificationId });
    }
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
  });
});

// Helper to emit new notification (exportable later)
export const emitNotification = (userId: string, notification: any) => {
  io.to(userRoom(userId)).emit('notification', notification);
};
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adora-lk';

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // Disable for API
}));

// Logging middleware
app.use(morgan('combined'));

// Rate limiting - global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:3002'],
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    }
  });
});

// Database connection status
app.get('/api/db-status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(dbState === 1 ? 200 : 503).json({
    success: dbState === 1,
    message: `Database is ${states[dbState as keyof typeof states]}`,
    data: {
      status: states[dbState as keyof typeof states],
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      timestamp: new Date().toISOString()
    }
  });
});

// Routes not found handler moved to after all other routes

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: error.message
    });
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      error: 'Duplicate field value'
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: 'Authentication failed'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
      error: 'Authentication failed'
    });
  }

  // Default error
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.stack : 'Something went wrong'
  });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server
    server.listen(PORT, () => {
      console.log(`Server + Socket.IO running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  mongoose.connection.close();
  process.exit(0);
});

export default app;
