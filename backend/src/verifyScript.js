
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail.js";
export function verifyScript({name,email,cpf,password}) {
        const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!name || !email || !cpf || !password) {
          throw new Error("Invalid credentials");
        }
        if (!regex.test(password)) {
          throw new Error("invalid password requisites");
        }
        if (!isEmail(email)) {
          throw new Error("invalid credentials");
        }
        if (!isValidCPF(cpf)) {
          throw new Error("invalid credentials");
        }
}