
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail.js";
const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export function verifyRegister({name,email,cpf,password}) {
        
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

export function verifyLogin({ email, password }) {
  if (!email || !password ) {
    throw new Error("Invalid all");
  }
  if (!isEmail(email)) {
    throw new Error("Invalid emails");
  }
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Invalid credentials");
  }
}