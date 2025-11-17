import express from 'express';
import cors from 'cors';
import containerRouter from './routers/container.router.js';
import imageRouter from './routers/image.router.js';
import networkRouter from './routers/network.router.js';
import volumeRouter from './routers/volume.router.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Docker Agent API is running!',
    version: '1.0.0',
    endpoints: {
      containers: '/api/v1/containers',
      images: '/api/v1/images',
      networks: '/api/v1/networks',
      volumes: '/api/v1/volumes'
    }
  });
});

// API Routes
app.use('/api/v1/containers', containerRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/networks', networkRouter);
app.use('/api/v1/volumes', volumeRouter);



export default app;