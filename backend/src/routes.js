import { Router } from "express"
import { createUserController } from "./controller.js"
import { loginService } from "./services.js"

const routes = Router()

routes.post("/user",createUserController)
routes.get("/user",)
export default routes