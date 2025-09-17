import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// if you use dirname without this variable you must to change the type from module to es to avoid errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/v1/income" , incomeRoutes);
app.use("/api/v1/expense" , expenseRoutes);
app.use("/api/v1/dashboard" , dashboardRoutes);

// Serve uploads folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Server is running on port ${port}`));