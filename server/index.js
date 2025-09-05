import express from 'express'
import connectDb from './config/db.js'
import cors from 'cors'
import dotenv from "dotenv";
import { router as authRoutes } from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import aiRoutes from './routes/aiRoutes.js'


const app = express()
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173" || "http://localhost:5174",
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