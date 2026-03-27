import { Router } from "express"
import { createUserController, loginController } from "./controller.js"

const routes = Router()

routes.post("/register",createUserController)
routes.post("/login",loginController)
export default routes