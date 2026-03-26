import pool from "./database/db.js";

export async function createUserModel({name,cpf,email,password}) {
    const res = await pool.query("INSERT INTO users(name,email,cpf,password) VALUES($1,$2,$3,$4) RETURNING *",[name,email,cpf,password])
    return res.rows[0]
}