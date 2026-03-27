
import { createUserService, loginService } from "./services.js";

export async function createUserController(req,res) {
    try{
    const user = await createUserService(req.body)
    res.status(201).json({
        message:"User created",
        status:"success",
        data:user
    })
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}
export async function loginController(req,res) {
    try{
        const user = await loginService(req.body)
        res.status(200).json({
        message:"User found",
        status:"success",
        data:user
    })
    }catch(err){
        res.status(500).json({
            message: "Server error",
            err:err.message
        })
    }
}
 