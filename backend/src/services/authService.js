import { createUserModel, loginModel } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { verifyLogin, verifyRegister } from "../verifyScript.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export async function createUserService(dataBody) {
    try {
        const { name, email, cpf, password } = dataBody;
        // role is always forced to "user" — never accepted from client
        const role = "user";
        verifyRegister({ name, email, cpf, password });
        const hash = await bcrypt.hash(password, 10);
        const user = await createUserModel({ name, email, cpf, password: hash, role });
        const { password: _, ...userSafe } = user;
        return userSafe;
    } catch (err) {
        if (err.code === "23505") {
            throw new AppError("Email or CPF already registered", 409);
        }
        throw err;
    }
}

export async function loginService(dataBody) {
    if (!dataBody) throw new AppError("No data received", 400);
    const { email, password } = dataBody;
    verifyLogin({ email, password });
    const user = await loginModel(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new AppError("Invalid email or password", 401);
    }
    const { password: _, ...userSafe } = user;
    const token = jwt.sign(
        { sub: userSafe.id, role: userSafe.role, email: userSafe.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return {
        user: {
            id: userSafe.id,
            name: userSafe.name,
            role: userSafe.role,
            email: userSafe.email,
        },
        token,
    };
}
