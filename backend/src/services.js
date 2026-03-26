import { createUserModel } from "./model.js";
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

export async function createUserService(dataBody) {
  try {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const { name, email, cpf, password } = dataBody;
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
    const hash = await bcrypt.hash(password, 10);
    return await createUserModel({
      email: email,
      password: hash,
      name: name,
      cpf: cpf,
    });
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("User already exists");
    }
    if (err.message) {
      throw err;
    }
    throw new Error("Internal server error");
  }
}
