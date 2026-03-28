import pool from "./database/db.js";

export async function createUserModel({name,cpf,email,password,role}) {
    const res = await pool.query("INSERT INTO users(name,email,cpf,password,role) VALUES($1,$2,$3,$4,$5) RETURNING *",[name,email,cpf,password,role])
    return res.rows[0]
}
export async function loginModel(email){
    const res = await pool.query("SELECT * FROM users WHERE email = $1",[email])
    if(res.rows.length === 0){
        throw new Error("invalid credentials")
    }
    return res.rows[0]
}