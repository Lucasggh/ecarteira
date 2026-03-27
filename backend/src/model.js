import pool from "./database/db.js";

export async function createUserModel({name,cpf,email,password}) {
    const res = await pool.query("INSERT INTO users(name,email,cpf,password) VALUES($1,$2,$3,$4) RETURNING *",[name,email,cpf,password])
    return res.rows[0]
}
export async function loginModel(email){
    const res = await pool.query("SELECT * FROM users WHERE email = $1",[email])
    if(res.rows.length === 0){
        const error = new Error("User not found")
        error.errorId = 1
        throw error
    }
    return res.rows[0]
}