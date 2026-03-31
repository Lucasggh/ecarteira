import {
  createUserModel,
  depositModel,
  loginModel,
  balanceModel,
  withdrawModel,
  TransferModel,
} from "./model.js";
import bcrypt from "bcrypt";
import { verifyLogin, verifyRegister } from "./verifyScript.js";
import jwt from "jsonwebtoken";
export async function createUserService(dataBody) {
  try {
    const { name, email, cpf, password, role } = dataBody;
    verifyRegister({ name, email, cpf, password, role });
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
    if (!dataBody) throw new Error("no data receive");
    const { email, password } = dataBody;
    verifyLogin({ email, password });
    console.log("passou verificaçao");
    const user = await loginModel(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("invalid credentials");
    }

    const { password: _, ...userSafe } = user;
    const token = jwt.sign(
      { sub: userSafe.id, role: userSafe.role, email: userSafe.email },
      process.env.JWT_SECRET,
      { expiresIn: "1Hr" },
    );
    const payload = {
      user: {
        id: userSafe.id,
        email: userSafe.email,
        role: userSafe.role,
      },
      token: token,
    };
    return payload;
  } catch (err) {
    throw err;
  }
}

export async function depositService(payload) {
  try {
    if (!/^\d+(\.\d{1,2})?$/.test(payload.amount)) {
      throw new Error("invalid amount format");
    }
    if (!payload.receiver_id || !payload.amount || !payload.type) {
      throw new Error("invalid credentials");
    }
    const deposit = await depositModel({
      ...payload,
      amount: String(payload.amount * 100),
    });
    return deposit;
  } catch (err) {
    throw err;
  }
}

export async function balanceService(id) {
  if (!id) {
    throw new Error("invalid credentials");
  }
  const balance = await balanceModel(id);
  console.log(`service: ${balance}`);
  return balance / 100;
}

export async function withdrawnService(payload) {
  try {
    if (!/^\d+(\.\d{1,2})?$/.test(payload.amount)) {
      throw new Error("invalid amount format");
    }
    if (!payload.sender_id || !payload.amount || !payload.type) {
      throw new Error("invalid credentials");
    }
    const withdrawn = await withdrawModel({
      ...payload,
      amount: String(payload.amount * 100),
    });
    return withdrawn.amount;
  } catch (err) {
    throw err;
  }
}

export async function transferService(payload) {
  try{
    if (!/^\d+(\.\d{1,2})?$/.test(payload.amount)) {
      throw new Error("invalid amount format");
    }
    if (!payload.sender_id || !payload.receiver_id || !payload.amount || !payload.type) {
      throw new Error("invalid credentials");
    }

    const balanceCents = await balanceModel(payload.sender_id)
    if(!balanceCents || balanceCents <= 0 || Number(payload.amount)*100 > Number(balanceCents)) {
      throw new Error ("invalid amount");
    }
    const transfer = await TransferModel({
      ...payload,
      amount: String(payload.amount * 100)})
      return transfer
  }catch(err){
    throw err;
  }
}