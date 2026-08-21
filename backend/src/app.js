import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import clientsRoutes from './routes/clientsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { connectDB } from './lib/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorMiddleware);

export default app;