import express from 'express'
import { LoginUser, registerUser, logoutUser } from '../controllers/authController.js'
import authMiddleware from '../middleware/auth.js';

export const router = express.Router();

router.post('/register', registerUser);

router.post('/login', LoginUser);

router.post('/logout', logoutUser);

router.get('/verify', authMiddleware, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});