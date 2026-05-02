import pool from "../database/db.js";
import { AppError } from "../utils/AppError.js";

export async function depositModel({ receiver_id, amount, type }) {
    const res = await pool.query(
        "INSERT INTO transactions (receiver_id,amount,type) VALUES($1,$2,$3) RETURNING *",
        [receiver_id, amount, type]
    );
    return res.rows[0];
}

export async function balanceModel(id) {
    const res = await pool.query(
        "SELECT COALESCE(SUM(CASE WHEN receiver_id = $1 THEN amount::NUMERIC WHEN sender_id = $1 THEN -amount::NUMERIC ELSE 0 END),0) AS balance FROM transactions",
        [id]
    );
    return res.rows[0].balance;
}

export async function withdrawModel({ sender_id, amount, type }) {
    const res = await pool.query(
        "INSERT INTO transactions (sender_id,amount,type) VALUES($1,$2,$3) RETURNING *",
        [sender_id, amount, type]
    );
    return res.rows[0];
}

export async function transferModel({ sender_id, receiver_id, amount, type, category }) {
    const res = await pool.query(
        "INSERT INTO transactions (sender_id,receiver_id,amount,type,category) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [sender_id, receiver_id, amount, type, category || "Sem Categoria"]
    );
    return res.rows[0];
}

export async function transactionsModel(id) {
    const res = await pool.query(
        "SELECT * FROM transactions WHERE receiver_id = $1 OR sender_id = $1 ORDER BY id DESC",
        [id]
    );
    return res.rows;
}

export async function userExistsModel(id) {
    const res = await pool.query("SELECT id FROM users WHERE id = $1", [id]);
    return res.rows.length > 0;
}
