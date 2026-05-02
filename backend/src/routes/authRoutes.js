import { Router } from "express";
import { createUserController, loginController } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many login attempts. Try again in 15 minutes." },
});

const authRoutes = Router();

authRoutes.post("/register", createUserController);
authRoutes.post("/login", loginLimiter, loginController);

export default authRoutes;
