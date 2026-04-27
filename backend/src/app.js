import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/messages', messagesRoutes);

app.use(errorMiddleware);

export default app;