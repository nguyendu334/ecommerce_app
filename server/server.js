import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

config();

// database connection
connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});