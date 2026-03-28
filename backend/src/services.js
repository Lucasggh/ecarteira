import { createUserModel, loginModel } from "./model.js";
import bcrypt from "bcrypt";
import { verifyLogin,verifyRegister } from "./verifyScript.js";
import jwt from "jsonwebtoken"
export async function createUserService(dataBody) {
  try {
    const { name, email, cpf, password,role } = dataBody;
    verifyRegister({ name, email, cpf, password,role });
    const hash = await bcrypt.hash(password, 10);
    const user = await createUserModel({ ...dataBody, password: hash });
    const { password: _, ...userSafe } = user;
    return userSafe;
  } catch (err) {
    if (err.code === "23505") {
      throw new Error("invalid credentials");
    }
    if (err.message) {
      throw err;
    }
    throw new Error("invalid credentials");
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
      throw new Error("invalid credentials");
    }

    const { password: _, ...userSafe } = user;
    const token = jwt.sign({sub:userSafe.id,role:userSafe.role},process.env.JWT_SECRET,{expiresIn:"1h"})
    const payload = {
      user:{
      id:userSafe.id,
      email:userSafe.email,
      role:userSafe.role
      },
      token:token
    }
    return payload;
  } catch (err) {
    throw err
  }
}
