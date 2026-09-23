import express from "express";
import { login } from "../controllers/authControllers.js";
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/login",rateLimitMiddleware, login); 

export default router;