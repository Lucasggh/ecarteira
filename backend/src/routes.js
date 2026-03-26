import { Router } from "express"
import { createUserController } from "./controller.js"

const routes = Router()

routes.post("/user",createUserController)

export default routes