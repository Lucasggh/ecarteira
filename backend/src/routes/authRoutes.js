import { Router } from "express";
import { createUserController, loginController } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/register", createUserController);
authRoutes.post("/login", loginController);

export default authRoutes;
