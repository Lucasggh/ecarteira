import { Router } from "express"
import { balanceController,
     createUserController, depositControler,
     loginController, withdrawController } from "./controller.js"
import { auth } from "./middlewares/auth.js"

const routes = Router()

routes.post("/register",createUserController)
routes.post("/login",loginController)

routes.post("/deposit",auth,depositControler)
routes.get("/balance",auth,balanceController)
routes.post("/withdrawn",auth,withdrawController)

export default routes