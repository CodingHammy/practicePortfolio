import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

import projectRoutes from './routes/project.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(express.json()); //allows us to use json data in the body

app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`listening on port http://localhost:${PORT}`);
});
