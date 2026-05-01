import { Router } from "express";
import { 
  balanceController, 
  depositController, 
  transactionsController, 
  transferController, 
  withdrawController 
} from "../controllers/transactionController.js";
import { auth } from "../middlewares/auth.js";

const transactionRoutes = Router();

transactionRoutes.post("/deposit", auth, depositController);
transactionRoutes.get("/balance", auth, balanceController);
transactionRoutes.post("/withdrawn", auth, withdrawController);
transactionRoutes.post("/transfer", auth, transferController);
transactionRoutes.get("/", auth, transactionsController);

export default transactionRoutes;
