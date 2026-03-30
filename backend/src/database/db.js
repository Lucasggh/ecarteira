import {Pool} from 'pg'
const pool = new Pool({
    user:process.env.PG_USER,
    host:'localhost',
    database:'ecarteira',
    password:process.env.PG_PASSWORD,
    port:process.env.DB_PORT
})
const r = await pool.query("select current_database() db, current_schema() schema");
console.log("DB INFO:", r.rows[0]);
export default pool