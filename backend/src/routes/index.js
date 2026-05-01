import { Router } from "express";
import authRoutes from "./authRoutes.js";
import transactionRoutes from "./transactionRoutes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/transactions", transactionRoutes);

export default routes;
