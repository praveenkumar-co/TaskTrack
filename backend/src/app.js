import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from 'node-utils-kit';
import taskRouter from './routes/taskRouter.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/tasks', taskRouter);

app.use((err, _req, res, _next) => {
  const result = errorHandler(err);
  res.status(result.statusCode).json(result.body);
});

export default app;
