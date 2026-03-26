
import { createUserService } from "./services.js";

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
            message: err?.message ?? "Server error",
            error: err?.message ?? err
        })
    }
}