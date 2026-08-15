import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import apiRoutes from './routes/index.js';
import { generalApiLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security & Parsing Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(generalApiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ui-kit-standard-api',
    timestamp: new Date().toISOString(),
  });
});

// Main API Endpoints
app.use('/api', apiRoutes);

// Central Error Handler
app.use(errorHandler);

// Connect to Database and start server
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 UI Kit Standard API Server running on port ${PORT}`);
    console.log(`📡 Accepting client requests from ${CLIENT_URL}`);
  });
});

export default app;
