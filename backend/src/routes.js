import { Router } from "express"
import { balanceController,
     createUserController, depositController,
     loginController, transactionsController, transferController, withdrawController } from "./controller.js"
import { auth } from "./middlewares/auth.js"

const routes = Router()

routes.post("/register",createUserController)
routes.post("/login",loginController)

routes.post("/deposit",auth,depositController)
routes.get("/balance",auth,balanceController)
routes.post("/withdrawn",auth,withdrawController)
routes.post("/transfer",auth,transferController)
routes.get("/transactions",auth,transactionsController)
export default routes