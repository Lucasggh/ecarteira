import {
  depositModel,
  balanceModel,
  withdrawModel,
  TransferModel,
  transactionsModel,
} from "../models/transactionModel.js";

export async function depositService(payload) {
  try {
    if (!/^\d+(\.\d{1,2})?$/.test(payload.amount)) {
      throw new Error("invalid amount format");
    }
    if (!payload.receiver_id || !payload.amount || !payload.type || Number(payload.amount) < 0) {
      throw new Error("invalid credentials");
    }
    const deposit = await depositModel({
      ...payload,
      amount: String(Math.round(payload.amount * 100)),
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
      amount: String(Math.round(payload.amount * 100)),
    });
    return withdrawn.amount;
  } catch (err) {
    throw err;
  }
}

export async function transferService(payload) {
  try {
    if (!/^\d+(\.\d{1,2})?$/.test(payload.amount)) {
      throw new Error("invalid amount format");
    }
    if (
      !payload.sender_id ||
      !payload.receiver_id ||
      !payload.amount ||
      !payload.type
    ) {
      throw new Error("invalid credentials");
    }

    const balanceCents = await balanceModel(payload.sender_id);
    if (
      !balanceCents ||
      balanceCents <= 0 ||
      Math.round(Number(payload.amount) * 100) > Number(balanceCents)
    ) {
      throw new Error("invalid amount");
    }
    const transfer = await TransferModel({
      ...payload,
      amount: String(Math.round(payload.amount * 100)),
    });
    return transfer;
  } catch (err) {
    throw err;
  }
}

export async function transactionsService(id) {
  try {
    const transactions = await transactionsModel(id);
    return transactions
  } catch (err) {
    throw err
  }
}
