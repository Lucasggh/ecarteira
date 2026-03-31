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

export async function depositModel({receiver_id,amount,type}) {
    const res = await pool.query("INSERT INTO transactions (receiver_id,amount,type) VALUES($1,$2,$3) RETURNING *",
    [receiver_id,amount,type])
    return res.rows[0]
}
export async function balanceModel(id) {
    const res = await pool.query("SELECT COALESCE(SUM(CASE WHEN receiver_id = $1 THEN amount::NUMERIC WHEN sender_id = $1 THEN -amount::NUMERIC ELSE 0 END),0)AS balance FROM transactions",[id]
    )
    console.log(`model: ${res.rows[0].balance}`)
    return res.rows[0].balance
}

export async function withdrawModel({sender_id,amount,type}) {
    const res = await pool.query("INSERT INTO transactions (sender_id,amount,type) VALUES($1,$2,$3) RETURNING *",
        [sender_id,amount,type]
    )
    return res.rows[0]
}

export async function TransferModel({sender_id,receiver_id,amount,type}) {
    
    const res = await pool.query("INSERT INTO transactions (sender_id,receiver_id,amount,type) VALUES($1,$2,$3,$4) RETURNING *",[sender_id,receiver_id,amount,type])
    return res.rows[0]

    
}