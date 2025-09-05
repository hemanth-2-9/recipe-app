import express from "express";
import { getRecipe } from "../controllers/aiController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/recipe", authMiddleware, getRecipe);

export default router;