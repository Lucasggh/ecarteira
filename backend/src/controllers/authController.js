import { createUserService, loginService } from "../services/authService.js";
import { AppError } from "../utils/AppError.js";

export async function createUserController(req, res) {
    try {
        const user = await createUserService(req.body);
        res.status(201).json({
            message: "User created successfully",
            status: "success",
            user,
        });
    } catch (err) {
        const status = err instanceof AppError ? err.statusCode : 500;
        const message = err instanceof AppError ? err.message : "Internal server error";
        if (status === 500) console.error("[createUserController]", err);
        res.status(status).json({ error: message });
    }
}

export async function loginController(req, res) {
    try {
        const { user, token } = await loginService(req.body);
        res.status(200).json({
            message: "Login successful",
            status: "success",
            user,
            token,
        });
    } catch (err) {
        const status = err instanceof AppError ? err.statusCode : 500;
        const message = err instanceof AppError ? err.message : "Internal server error";
        if (status === 500) console.error("[loginController]", err);
        res.status(status).json({ error: message });
    }
}
