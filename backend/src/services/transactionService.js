import {
    depositModel,
    balanceModel,
    withdrawModel,
    transferModel,
    transactionsModel,
    userExistsModel,
} from "../models/transactionModel.js";
import { AppError } from "../utils/AppError.js";

function validateAmount(rawAmount) {
    const amount = Number(rawAmount);
    if (isNaN(amount) || !Number.isFinite(amount) || amount <= 0) {
        throw new AppError("Amount must be a positive number", 400);
    }
    return amount;
}

export async function depositService(payload) {
    const amount = validateAmount(payload.amount);
    if (!payload.receiver_id || !payload.type) {
        throw new AppError("Missing required fields", 400);
    }
    const deposit = await depositModel({
        ...payload,
        amount: String(Math.round(amount * 100)),
    });
    return deposit;
}

export async function balanceService(id) {
    if (!id) throw new AppError("User ID is required", 400);
    const balance = await balanceModel(id);
    return Number(balance) / 100;
}

export async function withdrawnService(payload) {
    const amount = validateAmount(payload.amount);
    if (!payload.sender_id || !payload.type) {
        throw new AppError("Missing required fields", 400);
    }
    const balanceCents = await balanceModel(payload.sender_id);
    if (Number(balanceCents) <= 0 || Math.round(amount * 100) > Number(balanceCents)) {
        throw new AppError("Insufficient balance", 422);
    }
    const withdrawn = await withdrawModel({
        ...payload,
        amount: String(Math.round(amount * 100)),
    });
    return withdrawn.amount;
}

export async function transferService(payload) {
    const amount = validateAmount(payload.amount);
    if (!payload.sender_id || !payload.receiver_id || !payload.type) {
        throw new AppError("Missing required fields", 400);
    }
    if (String(payload.sender_id) === String(payload.receiver_id)) {
        throw new AppError("Cannot transfer to yourself", 400);
    }
    const receiverExists = await userExistsModel(payload.receiver_id);
    if (!receiverExists) {
        throw new AppError("Receiver not found", 404);
    }
    const balanceCents = await balanceModel(payload.sender_id);
    if (Number(balanceCents) <= 0 || Math.round(amount * 100) > Number(balanceCents)) {
        throw new AppError("Insufficient balance", 422);
    }
    const transfer = await transferModel({
        ...payload,
        amount: String(Math.round(amount * 100)),
    });
    return transfer;
}

export async function transactionsService(id) {
    const transactions = await transactionsModel(id);
    return transactions.map((t) => ({
        ...t,
        amount: String(Number(t.amount) / 100),
    }));
}
