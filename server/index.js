import express from 'express'
import connectDb from './config/db.js'
import cors from 'cors'
import dotenv from "dotenv";
import { router as authRoutes } from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import aiRoutes from './routes/aiRoutes.js'


const app = express()
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

// In production, we'll get the frontend URL from an environment variable
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json())

app.use(cookieParser());

connectDb();

const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes) 

export default app;