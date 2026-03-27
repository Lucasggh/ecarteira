import { createUserModel, loginModel } from "./model.js";
import bcrypt from "bcrypt";
import { verifyLogin,verifyRegister } from "./verifyScript.js";

export async function createUserService(dataBody) {
  try {
    const { name, email, cpf, password } = dataBody;
    verifyRegister({ name, email, cpf, password });
    const hash = await bcrypt.hash(password, 10);
    const user = await createUserModel({ ...dataBody, password: hash });
    const { password: _, ...userSafe } = user;
    return userSafe;
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

export async function loginService(dataBody) {
  try {
    if(!dataBody) throw new Error("no data receive")
    const { email,password} = dataBody;
    verifyLogin({email,password})
    console.log("passou verificaçao")
    const user = await loginModel(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("invalid password");
    }
    const { password: _, ...userSafe } = user;
    return userSafe;
  } catch (err) {
    throw err
  }
}
