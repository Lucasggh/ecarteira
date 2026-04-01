
import {
  balanceService,
  createUserService,
  depositService,
  loginService,
  transactionsService,
  transferService,
  withdrawnService,
} from "./services.js";

export async function createUserController(req, res) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({
      message: "User created",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
export async function loginController(req, res) {
  try {
    const user = await loginService(req.body);
    res.status(200).json({
      message: "User found",
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  }
}

export async function depositController(req, res) {
  try {
    const payload = {
      receiver_id: req.userId,
      amount: req.body.amount,
      type: "deposit",
    };
    const depositRes = await depositService(payload);
    res.status(200).json({
      message: "Succes deposit",
      status: "sucess",
      deposit: depositRes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  }
}

export async function balanceController(req, res) {
  try {
    const balance = await balanceService(req.userId);
    console.log(`controller: ${balance}`);
    res.status(200).json({
      message: "Succes get balance",
      status: "sucess",
      balance: balance,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  }
}

export async function withdrawController(req, res) {
  try {
    const payload = {
      sender_id: req.userId,
      amount: req.body.amount,
      type: "withdrawn",
    };
    const withdrawn = await withdrawnService(payload);
    res.status(200).json({
      message: "Succes withdrawn",
      status: "sucess",
      withdrawn: withdrawn,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  }
}

export async function transferController(req, res) {
  try {
    const payload = {
      sender_id: req.userId,
      receiver_id: req.body.receiver_id,
      amount: req.body.amount,
      type: "transfer",
    };
    const transfer = await transferService(payload);
    res.status(200).json({
      message: "Succes withdrawn",
      status: "sucess",
      transfer: transfer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  }
}

export async function transactionsController(req,res) {
  try{
  const transactions = await transactionsService(req.userId)
      res.status(200).json({
      message: "Succes get transactions",
      status: "sucess",
      transactions: transactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err.message,
    });
  
}}