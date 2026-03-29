import { Router } from "express"
import { createUserController, loginController } from "./controller.js"
import { auth } from "./middlewares/auth.js"

const routes = Router()

routes.post("/register",createUserController)
routes.post("/login",loginController)
routes.post("")
export default routes