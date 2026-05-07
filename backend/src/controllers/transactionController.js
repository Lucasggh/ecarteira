import {
    balanceService,
    depositService,
    transactionsService,
    transferService,
    withdrawnService,
} from "../services/transactionService.js";
import { AppError } from "../utils/AppError.js";

function handleError(res, err, label) {
    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : "Internal server error";
    if (status === 500) console.error(`[${label}]`, err);
    res.status(status).json({ error: message });
}

export async function depositController(req, res) {
    try {
        const payload = {
            receiver_id: req.userId,
            amount: req.body.amount,
            type: "deposit",
            category: req.body.category || "Depósito",
        };
        const depositRes = await depositService(payload);
        res.status(201).json({
            message: "Deposit successful",
            status: "success",
            deposit: depositRes,
        });
    } catch (err) {
        handleError(res, err, "depositController");
    }
}

export async function balanceController(req, res) {
    try {
        const balance = await balanceService(req.userId);
        res.status(200).json({
            message: "Balance retrieved",
            status: "success",
            balance,
        });
    } catch (err) {
        handleError(res, err, "balanceController");
    }
}

export async function withdrawController(req, res) {
    try {
        const payload = {
            sender_id: req.userId,
            amount: req.body.amount,
            type: "withdrawn",
            category: req.body.category || "Saque",
        };
        const withdrawn = await withdrawnService(payload);
        res.status(200).json({
            message: "Withdrawal successful",
            status: "success",
            withdrawn,
        });
    } catch (err) {
        handleError(res, err, "withdrawController");
    }
}

export async function transferController(req, res) {
    try {
        const payload = {
            sender_id: req.userId,
            receiver_id: req.body.receiver_id,
            amount: req.body.amount,
            type: "transfer",
            category: req.body.category,
        };
        const transfer = await transferService(payload);
        res.status(201).json({
            message: "Transfer successful",
            status: "success",
            transfer,
        });
    } catch (err) {
        handleError(res, err, "transferController");
    }
}

export async function transactionsController(req, res) {
    try {
        const transactions = await transactionsService(req.userId);
        res.status(200).json({
            message: "Transactions retrieved",
            status: "success",
            transactions,
        });
    } catch (err) {
        handleError(res, err, "transactionsController");
    }
}
