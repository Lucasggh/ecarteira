import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail.js";
import { AppError } from "./utils/AppError.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export function verifyRegister({ name, email, cpf, password }) {
    if (!name || !email || !cpf || !password) {
        throw new AppError("All fields are required", 400);
    }
    if (!passwordRegex.test(password)) {
        throw new AppError("Password must have 8+ characters, uppercase, lowercase, number and special character", 400);
    }
    if (!isEmail(email)) {
        throw new AppError("Invalid email format", 400);
    }
    if (!isValidCPF(cpf)) {
        throw new AppError("Invalid CPF", 400);
    }
}

export function verifyLogin({ email, password }) {
    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }
    if (!isEmail(email)) {
        throw new AppError("Invalid email format", 400);
    }
    if (typeof password !== "string" || password.length < 8) {
        throw new AppError("Password must be at least 8 characters", 400);
    }
}