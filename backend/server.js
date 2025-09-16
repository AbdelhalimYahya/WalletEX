import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare to handle cors 
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MiddleWare to handle json data
app.use(express.json());

connectDB();

app.use("/api/v1/auth" , authRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));